from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Contest)
admin.site.register(Contest_Problem)
admin.site.register(Contest_Submission)
admin.site.register(Submission_Result)
admin.site.register(Submission_Try)