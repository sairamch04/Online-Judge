
from .models import *
from django.forms import *
from django.forms.extras.widgets import SelectDateWidget
class CreateContest(ModelForm):
    class Meta:
        model = Contest
        fields=['title','starttime','endtime','description']
        

class  ContestProblemForm(ModelForm):
	class Meta:
		model=Contest_Problem
		fields=['category','contest','max_score','title','problem','testcase_in_1','testcase_in_2','testcase_in_3','testcase_out_1','testcase_out_2','testcase_out_3']

    


