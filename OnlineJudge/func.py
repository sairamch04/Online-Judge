
#!/usr/bin/python
from xml.dom.minidom import parse
import xml.dom.minidom



def evaluate(out,mode):
    data={}
    DOMTree = xml.dom.minidom.parse(out)
    flag = 1
    root = DOMTree.documentElement
    
    compil = root.getElementsByTagName('compile')[0]
    
    if compil.childNodes[0].data != "ok":
        result = 5
        flag = -1 
        error = root.getElementsByTagName('error')[0]
        data['compile_log'] = error
        return data   
           
    if flag == 1 :
        runtm = root.getElementsByTagName('runtmerror')[0]
        if len(runtm.childNodes) != 0:
            runtmerr = runtm.childNodes[0].data
            flag = -1
            result = 4
            data['runtmerr']=runtmerr

    if flag == 1 : 
        avg_time = root.getElementsByTagName('total_time')[0]
        if avg_time.childNodes[0].data == "tle":
            result = 3
            flag = -1
        elif mode == 2 :
            mode2_time = avg_time.childNodes[0].data
            data['mode2_time']=mode2_time

    if flag == 1 and mode == 2:
        o = root.getElementsByTagName('output')[0]
        output = o.childNodes[0].data
        result = 1
        data['output']=output

    testcase_passed = 0     
    
    if flag == 1 and mode == 1:
        testcase_time=[]    
        for i in range(0,3):
            tm = root.getElementsByTagName('time_testcase_'+ str(i))[0]
            testcase_time.extend([tm.childNodes[0].data])
            ans = root.getElementsByTagName('ans_testcase_' + str(i))[0]
            if ans.childNodes[0].data == "correct":
                testcase_passed = testcase_passed + 1
        data['testcase_time']=testcase_time
        data['testcase_passed']=testcase_passed    
    
        if testcase_passed == 3:
           result = 1
        else:
           result = 2

    data['result']=result
        

    return data