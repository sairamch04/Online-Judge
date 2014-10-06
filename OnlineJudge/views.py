import socket
import os 
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse,HttpResponseBadRequest
from django.shortcuts import render,redirect
from django.core.urlresolvers import reverse
from django.contrib.auth  import authenticate,login
from datetime import timedelta
from django.utils import timezone
from project import settings
from .forms import *
from .models import *
import string
import random
from .func import *
from project import settings
from django.core.files.base import ContentFile
import json




'''def homepage(request):
   user=authenticate(username="sairam",password="lenovo")
   login(request,user)
   #display few contests
   data={}
   #get few online contests
   #get completed contests
   #get future contests
   data['online_contests']=get_onlinecontests()
   data['finishedcontests']=get_finishedcontests()
   data['futurecontests']=get_futurecontests() 


   # few submissions of user
   data['submissions']=Contest_Submission.objects.filter(user=request.user)
   return render(request,"",data)'''


#@login_required
def create_contest(request):
  user=authenticate(username="sairam",password="lenovo")
  #ontest=Contest.objects.all()[0]
  data={}
  data['contestform']=CreateContest()
  data['contestproblem']=ContestProblemForm()
  
  data['title']="Create Contest"

  return render(request,"compile/createcon.html",data);
def get_problemshtml(request):
  mode=request.GET['mode']
  code=""
  for i in range(int(mode)):

    i=str(i)
    code+="""
    <div class="row text-center"><button class="btn btn-default btn-lg"> Problem """+str(int(i)+1)+"""</button></div>
    <div class="formgroup horizontal row">
    <label class="pull-left span3" for='category_"""+i+"""'>Category</label>
    <div class="block span8 profile-input pull-left">
        <textarea class="tagline fw auto-save with-help" required="false"  placeholder="U can leave it empty" name='category_'"""+i+"""' id='category_"""+i+"""'  rows="3"></textarea>
        
    </div>

</div>



<div class="formgroup horizontal row">
    <label class="pull-left span3" for='max_score"""+i+"""'>Max Score</label>
    <div class="block span8 profile-input pull-left">
       <input type="text" id='max_score"""+i+"""' name='max_score"""+i+"""'/>
        
    </div>

</div>
<div class="formgroup horizontal row">
    <label class="pull-left span3" for='title"""+i+"""'>title</label>
    <div class="block span8 profile-input pull-left">
       <input type="text" name"title" id='title"""+i+"""'  plaeholder="title of problem"/>
        
    </div>

</div>
<div class="formgroup horizontal row">
    <label class="pull-left span3" for='problem_"""+i+"""'>Problem Statement</label>
    <div class="block span8 profile-input pull-left">
       <textarea name='problem_"""+i+"""' class="summernote"  id='problem_"""+i+"""'/>
        
    </div>

</div>
<div class="formgroup horizontal row">
    <label class="pull-left span3" >Test case for problem"""+i+"""</label>
    <div class="col-md-12">
        <div class="col-md-6">
            <div class="row">
            <label for='in1_"""+i+"""'>Input Testcase 1</label>
            <input type="file" id='in1_"""+i+"""' name='in_"""+i+"""'/>
            </div>
            <div class="row">
            <label for='in2_"""+i+"""'>Input Testcase 2</label>
            <input type="file" id='in2_"""+i+"""' name='in_"""+i+"""'/>
            </div>
            <div class="row">
            <label for='in3_"""+i+"""'>Input Testcase 3</label>
            <input type="file" id='in3_"""+i+"""' name='in_"""+i+"""'/>
            </div>
            

        </div>
         <div class="col-md-6">
            <div class="row">
            <label for='out1_"""+i+"""'>Output Testcase 1</label>
            <input type="file" name='out1_"""+i+"""'/>
            </div>
            <div class="row">
            <label for='out2_"""+i+"""'>Output Testcase 2</label>
            <input type="file" name='out2_"""+i+"""'/>
            </div>
            <div class="row">
            <label for='out3_"""+str(i)+"""'>Output Testcase 3</label>
            <input type="file" name='out3_"""+str(i)+"""'/>
            </div>
            
        </div>

    </div>
    

</div>



    """
  return HttpResponse(code)





@login_required
def view_contests(request):
    user=authenticate(username="sairam",password="lenovo")
    login(request,user)
    data={}
    data['title']="CodeGear: View Contests"
    data['online_contests']=get_onlinecontests()
    data['finished_contests']=get_finishedcontests()
    data['future_contests']=get_futurecontests()
    return render(request,"compile/viewcontest.html",data)


@login_required
def view_contest(request,id):
    user=authenticate(username="sairam",password="lenovo")
    login(request,user)
    data={}

    contest=Contest.objects.get(id=id)
    data['status']=contest.is_online()
    data['problems']=contest.get_problems()
    data['title']=contest


    return render(request,"compile/problems_view.html",data)





@login_required
def view_problem(request,id):
    try:
      problem=Contest_Problem.objects.get(id=id)
    except Contest_Problem.DoesNotExist:
      return HttpResponse("Invalid address !!!")
    if not problem.contest.is_online():
      return HttpResponse("The contest was expired sorry")

    
    data={}
    data['problem']=problem
    data['title']=problem.title

    filename=generatestring()
    data['filename']=filename
    data['dashboard']=Contest_Submission.objects.filter(contest_problem=data['problem'])
    return render(request,"compile/problem_view.html",data)


@login_required
def submissions(request):
    data={}
    data['title']="My submissions"
    data['contest_submission']=Contest_Submission.objects.filter(user=request.user)
    data['practise_submission']=Submission_Try.objects.filter(user=request.user)
    return render(request,"compile/submissions.html",data)



@login_required
def practise(request):
  data={}
  data['title']="Welcome to Code editor"
  filename=generatestring_practise()
  data['filename']=filename

  return render(request,"compile/snippet.html",data)

# no login condition
def contest_code(request,id):
  try:
    submission=Contest_Submission.objects.get(id=id)
  except Contest_Submission.DoesNotExist:
    return HttpResponseBadRequest("Sorry dude.. invalid url address")
  data={}
  data['submission']=submission
  data['case']='contest_code'
  filepath=submission.fname.path
  data['title']=submission.user.username+'---code'
  fp = open(filepath, "r")
  content = fp.read()
  fp.close()
  data['code']=content

  return render(request,"compile/view_code.html",data)
  

#function which contains code
# no login condition 
def practise_code(request,id):
  try:
    submission=Submission_Try.objects.get(id=id)
  except Submission_Try.DoesNotExist:
    return HttpResponseBadRequest("Sorry dude.. invalid url address")
  data={}
  data['submission']=submission
  data['title']=submission.user.username+'---code'
  filepath=submission.fname.path
  fp = open(filepath, "r")
  content = fp.read()
  fp.close()
  data['code']=content
  data['case']='practise_code'

  return render(request,"compile/view_code.html",data)



#for submission of contest problems
def compile_ajax(request):

 
    #if request.method == 'POST' and request.is_ajax():

      
      if request.POST['submit'] == 'editor':
            
            code=request.POST['code']
            

            lang=request.POST['lang']

            filename=request.POST['filename']+'.'+lang
     
            comp=Contest_Submission(user=request.user)
            contest_problem_id=request.POST['problem_id']

            try:
              contest_problem=Contest_Problem.objects.get(id=contest_problem_id)
            except Contest_Problem.DoesNotExist:
              return HttpResponseBadRequest("the problem is not available")
            if not  contest_problem.contest.is_online():
              return HttpResponseBadRequest(" the problem time is completed")

            comp.contest_problem=contest_problem

            comp.fname.save(filename,ContentFile(code))
            comp.save()
            #pass also text cases
            test_path=comp.contest_problem.get_filename()
            path=''
            for i in range(len(test_path)):
              if  test_path[i] == '/':
                path=''
              elif test_path[i] == '_':
                break
              else:
                path+=test_path[i]


            xmlpath = socket1(comp.fname.path,path)

            result_dict=evaluate(xmlpath,1)
            sub_result=Submission_Result(submission=comp)
            sub_result.result_type=int(result_dict['result'])
            if int(result_dict['result'])   in [1,2]:
              time_list=result_dict['testcase_time']
              sub_result.time_1=float(time_list[0])
              sub_result.time_2=float(time_list[1])
              sub_result.time_3=float(time_list[2])
            sub_result.save()
            fp=open(xmlpath,"r")
            data=fp.read()
            fp.close()
            
            #os.remove(xmlpath)
            return HttpResponse(data)

      if request.POST['submit'] == 'upload':
            #filename=request.POST['filename']
            file_obj=request.FILES['code']

            comp=Contest_Submission(user=request.user)
            contest_problem_id=request.POST['problem_id']
            try:
              contest_problem=Contest_Problem.objects.get(id=contest_problem_id)
            except Contest_Problem.DoesNotExist:
              return HttpResponseBadRequest("the problem is not available")
            if not  contest_problem.contest.is_online():
              return HttpResponseBadRequest(" the problem time is completed")

            comp.contest_problem=contest_problem

            comp.fname=file_obj
            #if comp.get_filename()+'.'+comp.get_lang() == file_obj.name:
            #  Contest_Submission.objects.get()
            comp.save()
                 #pass also text cases
            test_path=comp.contest_problem.get_filename()
            path=''
            for i in range(len(test_path)):
              if  test_path[i] == '/':
                path=''
              elif test_path[i] == '_':
                break
              else:
                path+=test_path[i]


            xmlpath = socket1(comp.fname.path,path)

            result_dict=evaluate(xmlpath,1)
            sub_result=Submission_Result(submission=comp)
            sub_result.result_type=int(result_dict['result'])
            if int(result_dict['result'])   in [1,2]:
              time_list=result_dict['testcase_time']
              sub_result.time_1=float(time_list[0])
              sub_result.time_2=float(time_list[1])
              sub_result.time_3=float(time_list[2])
            sub_result.save()
            fp=open(xmlpath,"r")
            data=fp.read()
            fp.close()
            
            #os.remove(xmlpath)
            return HttpResponse(data)

    #else:

       # return HttpResponse("Access Denied!!!!")
@login_required
def get_filename(request,id):

  if int(id) ==2:
    
    filename=generatestring_practise()
  if int(id) ==1:
    filename=generatestring()
  return HttpResponse(filename)
  


@login_required
def get_code(request):
  mode=request.GET['mode']
  filename=request.GET['filename']
  if int(mode) == 1:
    code="""
    #include<stdio.h>

    int main(){
      printf("welcome To CodeGear");
      return 0;
    }

    """
  elif int(mode) ==2:
    code = """
  #include<iostream>
  int main(){
    cout<<"Welcome to Codegear";
  return 0;
  }
    """
  elif int(mode) ==3:
    code="""
    import java.util.Scanner;
    public class """+filename +"""{
      public static void main(String[] args){
      System.out.println("Welcome To CodeGear");
    }
    }



    """
  elif int(mode) == 4:
    code="""
    print "Hello, Python!";

    """
  return HttpResponse(code)



@login_required
def compile_practise_ajax(request):
  #if request.is_ajax() and request.method == 'POST':
            code=request.POST['code']
            lang=request.POST['lang']
            
            input_code=request.POST['input']

            filename=request.POST['filename']+'.'+lang
            #if comp.get_filename()+'.'+comp.get_lang() == filename:


            comp=Submission_Try(user=request.user)

            comp.fname.save(filename,ContentFile(code))

            input_filename=request.POST['filename']+'.txt'
            comp.finput.save(input_filename,ContentFile(input_code))
            comp.save()
            xmlpath = socket1(comp.fname.path,comp.finput.path)
            fp=open(xmlpath,"r")
            data=fp.read()
            fp.close()
            os.remove(xmlpath)
            return HttpResponse(data)
  #else:
    #return HttpResponse("access denied")


def get_contest_submisssions(contest):
    return Contest_Submission.objects.filter(contest_problem__contest=contest)

def generatestring(size=7,chars=string.ascii_uppercase +string.ascii_lowercase+ string.digits):

  flag=1
  while flag ==1:
    name=''.join(random.choice(chars) for _ in range(size))
    flag =-1;
    if ord(name[0])>=48 and ord(name[0])<=57:
      flag=1
      
  sub_objects=Contest_Submission.objects.all()
  for sub in sub_objects:
    if sub.get_filename() == name:
      generatestring()
  return name

def generatestring_practise(size=8,chars=string.ascii_uppercase+string.ascii_lowercase + string.digits):
  
  flag=1
  while flag ==1:
    name=''.join(random.choice(chars) for _ in range(size))
    flag =-1;
    if ord(name[0])>=48 and ord(name[0])<=57:
      flag=1


  
  sub_objects=Submission_Try.objects.all()
  for sub in sub_objects:
    if sub.get_filename() == name:
      generatestring_practise()
  return name




def get_finishedcontests():
    #contests=Contest.objects.all()
    objects=[]
    for contest in Contest.objects.all():
       now=timezone.now()
       if contest.endtime  < now:
           objects.append(contest)
    return objects



def get_onlinecontests():
    objects=[]
    for contest in Contest.objects.all():
        now=timezone.now()
        
        if contest.starttime <= now <= contest.endtime:
           objects.append(contest)
    return objects

def get_futurecontests():
    objects=[]
    for contest in Contest.objects.all():
       now=timezone.now()
       #fromend=self.starttime -self.endtime
       if contest.starttime > now:
           objects.append(contest)
    return objects

         
def socket1(path1,path2):
    HOST = 'localhost'    # The remote host
    PORT = 5001              # The same port as used by the server
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))
    string = path1 + ' '+ path2 
    s.sendall(string);
    data = s.recv(200)
    s.close()
    return data







    


