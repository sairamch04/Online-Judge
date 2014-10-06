#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <errno.h>
#include <syslog.h>
#include <stdint.h>
#include <inttypes.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <time.h>
#include <string.h>
#include <signal.h>
#define BILLION  1000000000L
#define SHELL "/bin/sh"
#define TIME_LIMIT 2 
#define TESTCASE_PATH "/home/sairam/Project/testcase"
#define NO_OF_INPUT_FILE 5
#define MY_DIR  "/home/sairam/Project/" 
#define SIZE 120
//char frmclient[250];
char name[30],classnm[25],path[110],input[110]; //**** limit should be strictly followed otherwise may lead to buffer overflow..
char * error,*exec_name,*output,*runtmerror,*xml,*user_output,*exec_java;
int pid_to_kill,limit=0;                          // limit- upto which testcse runned withoud tle.... :) 
struct timespec start,stop ;                               // for handling time....
double accum ;                                             // ..... 
FILE * fp = NULL;
struct stat st ;

void sig_child(int signo)                                 // to avoid Zombies :( Condn ... 
{
 pid_t pid;
 int stat,i;
   while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
     i = 1 ; 
  //printf("Il figlio %d ha terminato\n", pid);
}

char * timestamp(char name[] , int flag)                      //adding unique name(i.e timestamp) to file ..             
{                                                          // by adding current child pid + timestamp(cur.time) ;
    pid_t cpid ;
    int status ; 
    cpid = fork() ;
    if(cpid < 0){
                         // error  handling......
    }
    if(cpid==0)
       {
        exit(0) ; 
       }
    else if(cpid > 0){
      wait(&status);  
        }
    char *string=(char *)malloc(sizeof(char)*70);          // **** timestamp is producing size of 70 man.. keep in mind..
    memset(string,'\0',sizeof(string));
    sprintf(string,"%s%ld%d",name,(long)time(NULL),(int)cpid);
    
    if(flag==1)
       strcat(string,".txt");
    return string; 
}                                                          // prevents collision of parallel submission... :)  

int findfile(char address[])                                       //identifying file,ext,path etc.... 
{ char string[250],extension[15] ;
  int i=0,j=0,k=0,t=0,n=0,temp=0,m=0;
  strcpy(string,address);
  strtok(string," ");                                           // ****having little doubt on strtok ...  
  char *str = strtok(NULL," ");
  strcpy(input,str);
  memset(classnm,'\0',sizeof(classnm));                        // initializing all string with '\0' bytes.... 
  memset(name,'\0',sizeof(name));
  memset(extension,'\0',sizeof(extension));
  memset(path,'\0',sizeof(path)); 
  for(j=strlen(string)-1; j>=0 ; j-- )
  {
     if(string[j] =='/')
        {             
           j = j + 1 ;           
           n = j ;
           while(string[j]!='\0')
             {
                name[i] = string[j] ;
                 if(temp==1) 
                    extension[m++] = string[j] ; 
                
                 if(string[j]== '.')
                    {  temp = 1 ;
                       k = -1 ; 
                    }
                 if(k==0)
                    {  classnm[t] = string[j] ;
                       t++;
                    } 
                i++;
                j++;
             } 
        break ;
        }
   }
    strncpy(path,address,n);    
         if(strcmp(extension,"c")==0)
               return 1 ;
             else if(strcmp(extension,"cpp")==0)
                return 2 ;
               else if(strcmp(extension,"java")==0)  
                  return 3 ;
                    else if ( strcmp(extension,"py")==0)               
                        return 4 ;                                      
                            else                         // **** this condn must not arrive..  
                               return -90 ;

}

int main(int argc, char * argv[])
{ 
  //FILE * logfile = fopen(MY_DIR) ;
  pid_t pid,sid; 
  pid = fork() ;                                   //forking....(child generating machine... :) ... 
  if(pid<0)
    {
      //printf("error in fork ");                 //error handling... 
     // exit(0); 
    }
      if(pid>0)
         exit(0) ;                               // exiting parent to make child.. daemon...  :)   
  umask(0);                                     // permissions... 
  sid = setsid();                                // setsid -- session id..
  chdir((MY_DIR));                              // going to my home ... 
  if (sid < 0) {
                /* Log the failure */
                
                exit(EXIT_FAILURE);
        }

  /* close(STDIN_FILENO);
     close(STDOUT_FILENO);
     close(STDERR_FILENO);   
  */
  // The daemon process begins .. 
int socketfd,clientsocket,portno,clilen,status ; 
//char frmclient[256] ; 
struct sockaddr_in server_addr, client_addr ;  
//while(1) {

       
    socketfd = socket(AF_INET,SOCK_STREAM,0) ;
    if(socketfd<0)
       { perror("error in socket opening") ; 
         exit(1) ; }
    bzero((char *)&server_addr,sizeof(server_addr)) ;
    portno = 5001 ; 
    server_addr.sin_family = AF_INET ; 
    server_addr.sin_addr.s_addr = INADDR_ANY ;
    server_addr.sin_port = htons(portno) ;

    if(bind(socketfd, (struct sockaddr *)&server_addr,sizeof(server_addr)) < 0 )
         {
          perror("error in binding: ");
         } 
       /* now listening for connection....*/
   listen(socketfd,5);
   clilen = sizeof(client_addr) ;      
   
   signal(SIGCHLD, sig_child) ;           // helps in  avoiding ZOMBIES.....

   while(1)
  {   
     
   clientsocket = accept(socketfd, (struct sockaddr *)&client_addr , &clilen) ;
   
    if(clientsocket < 0 )
       perror("errror in accepting client :") ;
  pid = fork() ;

   if(pid < 0)
      perror("Fork error:") ; 
    if(pid==0)
    {
      close(socketfd);
      Do_Processing(clientsocket) ;
      exit(0);
    }
     else
       {
        close(clientsocket);
        // wait(&status);
       }
   } 
  return 0 ;
}
 int C(char * cmd,int exec_method,char * problem_id ,int i)    // **** keep in mind size(cmd)=500 
 {   if(exec_method==0)                                        // making cmd for compilation... 
        sprintf(cmd,"{ gcc -Wextra -o %s %s ;} 2>>%s",exec_name,name,error); 
       else if(exec_method==1)                                // making cmd for execution(method=1)
           sprintf(cmd,"{ ./%s ;} < %s >> %s 2>>%s",exec_name,input,output,runtmerror);
          else if(exec_method==2)                             // ...... for execution(method -2)
            sprintf(cmd,"{ ./%s ;} < %s/P%s_in_%d.txt >> %s 2>>%s",exec_name,(TESTCASE_PATH),problem_id,i,user_output,runtmerror);  //apending runtmerror        
      return 0 ; 
 }
 int Cpp(char * cmd,int exec_method,char * problem_id ,int i)
 {   if(exec_method==0)    
      sprintf(cmd,"{ g++ -Wextra -o %s %s ;} 2>>%s",exec_name,name,error); 
       else if(exec_method ==1)
         sprintf(cmd,"{ ./%s ;} <%s >> %s 2>>%s",exec_name,input,output,runtmerror);
          else if(exec_method==2)
             sprintf(cmd,"{ ./%s ;} < %s/P%s_in_%d.txt >> %s 2>>%s",exec_name,TESTCASE_PATH,problem_id,i,user_output,runtmerror);
    return 0 ;
 }
 int Java(char * cmd,int exec_method,char * problem_id ,int i)
 {
    if(exec_method==0)
      sprintf(cmd,"{ javac %s ;} 2>>%s",name,error); 
       else if(exec_method ==1)
        sprintf(cmd,"{ java %s ;} <%s >> %s 2>>%s",classnm,input,output,runtmerror);
          else if(exec_method ==2)
            sprintf(cmd,"{ java %s ;} <%s/P%s_in_%d.txt >> %s 2>>%s",classnm,TESTCASE_PATH,problem_id,i,user_output,runtmerror);

     return 0 ; 
 }
 int Python(char * cmd,int exec_method,char * problem_id ,int i)
 {
    if(exec_method==0)  
      sprintf(cmd,"{ python -m py_compile %s ;} 2>>%s",name,error);
       else if(exec_method==1)
        sprintf(cmd,"{ python %s ;} <%s >> %s 2>>%s",name,input,output,runtmerror); 
          else if(exec_method==2)
            sprintf(cmd,"{ python %s ;} <%s/P%s_in_%d.txt >> %s 2>>%s",name,TESTCASE_PATH,problem_id,i,user_output,runtmerror); 
    return 0 ;
 }
 
 /*char * Perl()
 {
      char *cmd ;
      sprintf(cmd,"gcc -Wextra -o %s %s >>%s"); 
      return cmd ;
 }
 */
    
  
 
int Change_mode(char file[]){
  int f ;
  f = open(file,O_WRONLY | O_CREAT);
  chmod(file, S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH);
  close(f);
   }

char * find_compile_cmd_or_exec_cmd(int flag,int exec_method)
 {char * cmd = malloc(sizeof(char)*500);    
  if(exec_method==1)                                 // for compilation only...... 
   { 
     output = timestamp("output",1);                      //as in method 1 output contains .txt but in metho 2 it doesn't
     Change_mode(output);
   }
    else if(exec_method==0)   
    {    
     error = timestamp("error",1);
     Change_mode(error);
     if(flag==1)
       {
          exec_name = timestamp("solution",0);
          int file = open(exec_name,O_CREAT);
          chmod(exec_name, S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IWGRP | S_IXOTH | S_IROTH | S_IWOTH);   
       }
        else if (flag==2){
            exec_name = timestamp("solution",0);
            int file = open(exec_name,O_CREAT);
            chmod(exec_name, S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IWGRP | S_IXOTH | S_IROTH | S_IWOTH);   
       }
        else if(flag==3){
                exec_java = malloc(sizeof(char)*100);
                sprintf(exec_java,"%s.class",classnm);
                int file = open(exec_java,O_CREAT);
               chmod(exec_java, S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IWGRP | S_IXOTH | S_IROTH | S_IWOTH);   
        }
          else if(flag==4){
           /*chmod(name, S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IWGRP | S_IXOTH | S_IROTH | S_IWOTH);
           char *py = malloc(sizeof(char)*40);
           sprintf(py,"%sc",name);
           chmod(py, S_IXUSR | S_IRUSR | S_IWUSR | S_IXGRP | S_IRGRP | S_IWGRP | S_IXOTH | S_IROTH | S_IWOTH);
          */
          }

    } 


  if(flag==1)
      C(cmd,exec_method,NULL,0);
      else if(flag == 2)
         Cpp(cmd,exec_method,NULL,0);
          else if(flag==3)
             Java(cmd,exec_method,NULL,0);
              else if(flag ==4)
                 Python(cmd,exec_method,NULL,0);
                        else{
                                // any other file...
                            }
 return cmd ; 
 }

 int Compilation(char * compile_comm)                     /// programm compilation....
 {
  pid_t cpid ;
  int status ;
  cpid = fork();
  if(cpid==0){    setuid(5001);                                         //making guest........
               if(execl(SHELL,SHELL,"-c",compile_comm,NULL)<0)         // error occurrs...... 
                   exit(-8);
             }
  waitpid(cpid,&status,0);
  stat(error,&st);
  if(st.st_size==0)
     return 1 ;
    else
      return -1;
  /*if(WIFEXITED(status))
    { 
      if(WEXITSTATUS(status)>=0) 
         return 1 ;
       else{
                     // error handling........................
           }
     }
      else
       return -1;
    // other signal handling ...... afterwords... 
  */
  }

void handle_tle(int sig)
{
  
        //  do something man.....  
        //printf("fgggg")
        kill(-1*(pid_to_kill),SIGTERM);
     
}
int execution(char * exec_cmd,int file_type)
{
  pid_t cpid ; 
  int status ;
  signal(SIGALRM,handle_tle);              // setting function for signal - SIGALRM    
  int x = (TIME_LIMIT) ;                    
  if(file_type==3)
    x = 2*(TIME_LIMIT) ;
    else if(file_type == 4)
      x = 3*(TIME_LIMIT) ;
  alarm(0);                              // deleting all other alarms ...  
  alarm(x);                            //TIMES STARTS NOW...............lets see how fast u go :) ...........  
  cpid = fork();
   if(cpid <0)
   {                                 // error handling..  
    printf("err occurs while fork()");
   }
   if(cpid == 0)
    {setpgrp();                       // making group id = caller processid .. means child is leader of its subchild process..
     pid_to_kill = getpid();         // getting processid for killing....
      setuid(5001) ;                 // changing user id.. of calling process to guest....
     if(execl(SHELL,SHELL,"-c",exec_cmd,NULL) < 0 )              // if error occurs in execl .. 
         exit(-8) ; 
    }
  else{
    pid_to_kill = cpid;
    setpgid(cpid,cpid);                                 // avoiding race condn ... 
    waitpid(cpid,&status,0);                
    if(WIFEXITED(status))
       {
        //    fprintf("<exit status>%d</exit status>",WEXITSTATUS(status));
        return 1 ;
       }
       else if(WIFSIGNALED(status))                  // if any signal cause death of child :(
       {

        if(WTERMSIG(status)==SIGTERM)              // tle occured.... (i.e death caused by SIGTERM :(  )
           {      
                 return -1;  
           }
         // other signal handling..........afterwords.................
        return -1 ;
       }



    }  

}

int write_to_file(char file[])
{ char temp[SIZE];
  FILE * tmp = fopen(file,"r");
  while(fgets(temp,SIZE,tmp)!=NULL)
      fprintf(fp,"%s",temp);
  fflush(tmp);
  fflush(fp);
  fclose(tmp);
  return 0 ;  
}
int execute_2(int file_type)                     //execution by giving predefined input files...and corresponding output.. i.e 2nd case for execution.
{ char *cmd = (char*)malloc(sizeof(char)*500);
  user_output = malloc(sizeof(char)*70);
  char problem_id[12];
  memset(cmd,'\0',sizeof(cmd));
  memset(user_output,'\0',sizeof(user_output));
  memset(problem_id,'\0',sizeof(problem_id));
  strncpy(problem_id,input+1,strlen(input)-1);
  double total_time = 0 ; 
  int i,tle_flag = -1,runtmerr_flag = -1 ; 
  
  for(i =0;i<(NO_OF_INPUT_FILE);i++)                      // making executing cmd for each case as input and output varies for each..
  {sprintf(user_output,"%s_o_%d.txt",output,i);
   Change_mode(user_output);
   fflush(stdout);
      
      if(file_type==1)
          C(cmd,2,problem_id,i);
        else if(file_type==2)
              Cpp(cmd,2,problem_id,i);
            else if(file_type==3)
                 Java(cmd,2,problem_id,i);
               else if(file_type==4)
                    Python(cmd,2,problem_id,i);
 
     clock_gettime(CLOCK_REALTIME, &start);          // recording time ... here.. 
     if(execution(cmd,file_type)==-1)
         { tle_flag = 1 ;
           //fprintf(fp,"<total_time>tle</total_time>");
           limit = i ;                                 //care_ taking for evaluation...   
           break ;
         }
        else
           {
             clock_gettime(CLOCK_REALTIME,&stop);        // recording time .. hre..
             accum = ( stop.tv_sec - start.tv_sec )  + (double)( stop.tv_nsec - start.tv_nsec ) / (double)BILLION;  
             total_time = total_time + accum ;
             fflush(fp);  
             fprintf(fp,"<time_testcase_%d>%lf</time_testcase_%d>",i,accum,i);
             fflush(fp);
             //break ;
           }
      stat(runtmerror,&st);
      if(st.st_size!=0)                                     //writing runtmerror... 
          { 
            fprintf(fp,"<runtmerror>");
            fflush(fp);
            write_to_file(runtmerror);
            fprintf(fp,"</runtmerror>");
            fflush(fp);
            limit = i ;
            runtmerr_flag = 1 ; 
            break ;   
          }
   fflush(fp);
  
   }
   if(tle_flag != 1)                      //tle_flag non true i.e no tle occurred..
      { 
         double avg_time = total_time/(NO_OF_INPUT_FILE)*1.0 ;           //****error may appear check it man.. (type conv)
         fprintf(fp,"<total_time>%lf</total_time>",avg_time);
         fflush(fp);
         limit = i ; 
      }
      else 
         {fprintf(fp,"<total_time>tle</total_time>");
          fflush(fp);
         } 
   if(runtmerr_flag != 1)                               // if no runtmerror occurs.. 
      {fprintf(fp,"<runtmerror></runtmerror>");
       fflush(fp);}
//remove(user_output);
return 0 ;
}

int check_soln(char correct_output[],char user_output[])
{
  FILE *fp1, *fp2;
    int ch1, ch2;

    fp1 = fopen( correct_output,  "r" );
    fp2 = fopen( user_output,  "r" ) ;

    if ( fp1 == NULL || fp2 == NULL)
       {
                            // error handling....
       }
    else
       {
       ch1  =  getc( fp1 ) ;
       ch2  =  getc( fp2 ) ;

       while( (ch1!=EOF) && (ch2!=EOF) && (ch1 == ch2))
        {
            ch1 = getc(fp1);
            ch2 = getc(fp2) ;
        }

        if (ch1 == ch2)
            return 1 ;                                  //Files are identical;
        else if (ch1 !=  ch2)
            return -1  ;                                 //Files are Not identical;

        fclose ( fp1 );
        fclose ( fp2 );
       }
}
int Do_Processing(int clientsocket)
{//signal(SIGCHLD,sig_child);                                      
 
 //char * frmclient ="/home/mukesh/Project/exec/hello.java /home/mukesh/Project/testcase/P1234_in_2.txt" ;       
   //char frmclient[150] ;
   //char frmserver[150];
 char frmclient[250];
 bzero(frmclient,250);
 
 int n = read(clientsocket,frmclient,249) ;
 //fprintf(stdout,"%s",hello);
      if(n<0)
          {perror("Error reading from socket : ") ;
           return 0  ;
          }

  int exec_method = -1,compile_flag= -1,extension_flag= -1,i ;      //                     
                                                                   //..  
  extension_flag = findfile(frmclient) ;                                
  chdir(path);                                      // going to killers home... lets fuck it... 
  // chdir("/home/mukesh/myWeb/mysite/test/");                                 
  xml = timestamp("xml",1);
  fp = fopen(xml,"a+");
  fprintf(fp,"<\?xml version=\"1.0\" encoding=\"utf-8\"\?><root>");
  fflush(fp);
  char *compile_comm = find_compile_cmd_or_exec_cmd(extension_flag,0);       // must notice size of compile_comm
  compile_flag = Compilation(compile_comm);
  fflush(stdout);
  if(compile_flag==1)              
    {                                                   // execution will definetly cme so make files req for it..
      runtmerror = timestamp("runtmerror",1) ;
      Change_mode(runtmerror);      
      fprintf(fp,"<compile>ok</compile>");
      fflush(fp);
                                             // most imp.. nh to idhar udhar likh detha hai..   
    if(input[0]=='P')
       exec_method = 2 ;
         else
           exec_method = 1 ;                         

   if(exec_method == 1)                  // for normal code running purpose... // handling runtmerr and time,output here only
    { 
     char * exec_cmd1 = find_compile_cmd_or_exec_cmd(extension_flag,exec_method);
     clock_gettime(CLOCK_REALTIME, &start);
   
     if(execution(exec_cmd1,extension_flag) == -1) 
       {
         fprintf(fp,"<time>tle</time>");
         fflush(fp);
       }
      else
        {
         clock_gettime(CLOCK_REALTIME, &stop);
         accum = ( stop.tv_sec - start.tv_sec )  + (double)( stop.tv_nsec - start.tv_nsec ) / (double)BILLION;  
         fprintf(fp,"<total_time>%lf</total_time>",accum);
         fflush(fp);
        } 
    
    stat(runtmerror,&st);                                   //writing runtmerror...
    if(st.st_size!=0){
        fprintf(fp,"<runtmerror>");
        fflush(fp);
        write_to_file(runtmerror);
        fprintf(fp,"</runtmerror>");
        fflush(fp);
    }else
        fprintf(fp,"<runtmerror></runtmerror>");
        fflush(fp);
    stat(output,&st);    
 if(st.st_size<=2000000)   
    {
     fprintf(fp,"<output>");                              //writing output to xml...... 
     fflush(fp);
     write_to_file(output);  
     fprintf(fp,"</output>");
     fflush(fp);  
    }
     else
       fprintf(fp,"<output>too large</output>");
       fflush(fp);
   }

   else if(exec_method==2)            // when user submits prg for evaluation...   
   {  output = timestamp("output",0);          // here output doesnt contain .txt      
      execute_2(extension_flag);   
       
 
   // now evaluation time...................................................
  //sprintf(cmd,"{ cmp %s/P%s_out_%d.txt %s ;} 1>>%s 2>>%s",(TESTCASE_PATH),prob_id,i,user_output,temp,temp);
   stat(runtmerror,&st);
   if(st.st_size == 0)
     { char * correct_output = malloc(sizeof(char)*120);
        for(i=0;i<limit;i++)
          {
           sprintf(user_output,"%s_o_%d.txt",output,i);
           sprintf(correct_output,"%s/%s_out_%d.txt",(TESTCASE_PATH),input,i);
             if(check_soln(correct_output,user_output)==1)
               fprintf(fp,"<ans_testcase_%d>correct</ans_testcase_%d>",i,i);
                  else
                     fprintf(fp,"<ans_testcase_%d>wrong</ans_testcase_%d>",i,i);
           fflush(fp);                 
          }   
      // evaluation(extension_flag); 
     }
      else
        {
             // runtmerror so no evaluation  ....  
        }
    
     
    }
    
   }
   else
      {
        fprintf(fp,"<compile>no</compile>");
        fflush(fp);
        fprintf(fp,"<error>");
        fflush(fp);
        write_to_file(error);
        fprintf(fp,"</error>");        
        fflush(fp);
      }
  fprintf(fp,"</root>\n");
  fflush(fp);
  fclose(fp);
  if(extension_flag==1 || extension_flag == 2)
    remove(exec_name);
    else if(extension_flag==3)
       remove(exec_java);
  remove(error);
  remove(runtmerror);
 
  for(i=0;i<=limit;i++)
  {
   char * str = (char*)malloc(sizeof(char)*70);
   
   sprintf(str,"%s_o_%d.txt",output,i);
   remove(str);
  }

  remove(output);                                 
                                                            // very tired....   
  chdir((MY_DIR)); 
  char reply[250];
  sprintf(reply,"%s%s",path,xml);                                        // now returning back to my home... :) 
  n = write(clientsocket,reply,strlen(reply));
  return 0 ;
}
