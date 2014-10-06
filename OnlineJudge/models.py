from django.db import models
from django.contrib.auth.models import User
import os
from datetime import datetime,timedelta
from django.utils import timezone


# Create your models here.

class Contest(models.Model):

    title=models.TextField(max_length=30)
    contestor=models.ForeignKey(User)
    starttime=models.DateTimeField(blank=False)
    endtime=models.DateTimeField(blank=False)
    description=models.TextField(max_length=400)
    def save(self,*args,**kwargs):
        now =timezone.now()-timedelta(minutes=10)
        if self.endtime >= now:
            super(Contest,self).save(*args,**kwargs)
    def is_online(self):
        if self.starttime <= timezone.now() <= self.endtime:
            return True
        else:
            return False

    def get_problems(self):
        return self.contest_problem_set.all()
    def get_problem(self,id):
        return self.contest_problem_set.get(id=id)
    def num_submissions(self):
        problems=self.contest_problem_set()
        count=0
        for problem in problems:
            count+=problem.get_submissions().count()
        return count
    def __str__(self):
        return self.description[:20] +".."


def path_to_rename(instance, filename):
    '''Compute path to filename'''
    # define uid here
    uid = getattr(instance, '_uid', None)
    num = getattr(instance, '_num', None)
    return os.path.join('compile/testcases',uid, filename)

class Contest_Problem(models.Model):
    category=models.TextField(blank=True,max_length=10)
    contest=models.ForeignKey(Contest)
    max_score=models.IntegerField()

    title = models.TextField(max_length=30)
    
    problem=models.TextField()
    testcase_in_1=models.FileField(upload_to='compile/testcases')
    testcase_in_2=models.FileField(upload_to='compile/testcases')
    testcase_in_3=models.FileField(upload_to='compile/testcases')
    testcase_out_1=models.FileField(upload_to='compile/testcases')
    testcase_out_2=models.FileField(upload_to='compile/testcases')
    testcase_out_3=models.FileField(upload_to='compile/testcases')
    def __init__(self, *args, **kwargs):
        #self._uid = None
        #sef._num = None
        super(Contest_Problem, self).__init__(*args, **kwargs)

    def save(self, uid=None, num=None, *args, **kwargs):
        #self._uid = uid
        #self._num = num
        super(Contest_Problem, self).save(*args, **kwargs)
    #filename of first test case
    def get_filename(self):
        fileName, fileExtension = os.path.splitext(self.testcase_in_1.path)
        return fileName

    def get_submissions(self):
        return self.contest_submission_set.all()

    def get_accuracy(self):
        attempted=self.get_submissions().count()
        correct=self.get_submissions.filter(submission_result_set__result_type =1).count()
        return correct/attempted


    def __str__(self):
        return self.title[:20]+".."
    

class Contest_Submission(models.Model):
    created=models.DateTimeField(auto_now_add=True,blank=True)
    contest_problem=models.ForeignKey(Contest_Problem)
    fname=models.FileField(upload_to='compile/contest_submission')
    user=models.ForeignKey(User)
    class Meta:
        ordering=['-created']
    #overriding
    def save(self,*args,**kwargs):
        start=self.contest_problem.contest.starttime
        end=self.contest_problem.contest.endtime
        now=timezone.now()
        if start <= now and end >= now:
            super(Contest_Submission,self).save(*args,**kwargs)
            return True
        else:
            return False

    def get_result(self):
        return self.submission_result.result_type
    def get_lang(self):
        fileName, fileExtension = os.path.splitext(self.fname.path)
        return fileExtension[1:]
    def get_filename(self):
        fileName, fileExtension = os.path.splitext(self.fname.path)
        return fileName

    def get_testcase_passed(self):
        return self.submission_result.testcase_passed
    def get_average_time(self):
        return self.submission_result.get_avg_time()

        

class Submission_Result(models.Model):
    submission = models.OneToOneField(Contest_Submission)
    testcase_passed = models.IntegerField(default=0)
    time_1=models.FloatField(blank=True,default=0)
    time_2=models.FloatField(blank=True,default=0)
    time_3=models.FloatField(blank=True,default=0)
    result_type = models.IntegerField()
    # 1 --correct answer
    # 2 ---wrong
    # 3 --time limit exeeded
    # 4--runtime error
    # 5 ---complation error
    def __str__(self):
        return self.result_type
    def get_avg_time(self):
        try:

           return "{0:.5f}".format((self.time_1+self.time_2+self.time_3)/3)
        except Exception:
            return 0

class Submission_Try(models.Model):
    created=models.DateTimeField(auto_now_add=True,blank=True)
    user=models.ForeignKey(User)
    fname=models.FileField(upload_to='compile/practise')
    finput=models.FileField(upload_to='compile/practise',blank=True)
    class Meta:
        ordering=['-created']
    def __str__(self):
        return self.user.username
    def get_lang(self):
        fileName, fileExtension = os.path.splitext(self.fname.path)
        return fileExtension[1:]
    def get_filename(self):
        fileName, fileExtension = os.path.splitext(self.fname.path)
        return fileName




