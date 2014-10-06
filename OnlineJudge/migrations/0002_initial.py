# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Contest'
        db.create_table('compile_contest', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contestor', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('starttime', self.gf('django.db.models.fields.DateTimeField')()),
            ('endtime', self.gf('django.db.models.fields.DateTimeField')()),
            ('description', self.gf('django.db.models.fields.TextField')(max_length=500)),
        ))
        db.send_create_signal('compile', ['Contest'])

        # Adding model 'Contest_Problem'
        db.create_table('compile_contest_problem', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('contest', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['compile.Contest'])),
            ('title', self.gf('django.db.models.fields.TextField')()),
            ('problem', self.gf('django.db.models.fields.TextField')()),
            ('testcase_in_1', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('testcase_in_2', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('testcase_in_3', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('testcase_out_1', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('testcase_out_2', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('testcase_out_3', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal('compile', ['Contest_Problem'])

        # Adding model 'Contest_Submission'
        db.create_table('compile_contest_submission', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(blank=True, auto_now_add=True)),
            ('contest_problem', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['compile.Contest_Problem'])),
            ('fname', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
        ))
        db.send_create_signal('compile', ['Contest_Submission'])

        # Adding model 'Submission_Result'
        db.create_table('compile_submission_result', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('submission', self.gf('django.db.models.fields.related.OneToOneField')(unique=True, to=orm['compile.Contest_Submission'])),
            ('testcase_passed', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('average_time', self.gf('django.db.models.fields.FloatField')()),
            ('result_type', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal('compile', ['Submission_Result'])

        # Adding model 'Submission_Try'
        db.create_table('compile_submission_try', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('fname', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('finput', self.gf('django.db.models.fields.files.FileField')(blank=True, max_length=100)),
        ))
        db.send_create_signal('compile', ['Submission_Try'])


    def backwards(self, orm):
        # Deleting model 'Contest'
        db.delete_table('compile_contest')

        # Deleting model 'Contest_Problem'
        db.delete_table('compile_contest_problem')

        # Deleting model 'Contest_Submission'
        db.delete_table('compile_contest_submission')

        # Deleting model 'Submission_Result'
        db.delete_table('compile_submission_result')

        # Deleting model 'Submission_Try'
        db.delete_table('compile_submission_try')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '80', 'unique': 'True'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'to': "orm['auth.Permission']", 'symmetrical': 'False'})
        },
        'auth.permission': {
            'Meta': {'object_name': 'Permission', 'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)"},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'blank': 'True', 'max_length': '75'}),
            'first_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '30'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'symmetrical': 'False', 'to': "orm['auth.Group']", 'related_name': "'user_set'"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '30'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'symmetrical': 'False', 'to': "orm['auth.Permission']", 'related_name': "'user_set'"}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '30', 'unique': 'True'})
        },
        'compile.contest': {
            'Meta': {'object_name': 'Contest'},
            'contestor': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"}),
            'description': ('django.db.models.fields.TextField', [], {'max_length': '500'}),
            'endtime': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'starttime': ('django.db.models.fields.DateTimeField', [], {})
        },
        'compile.contest_problem': {
            'Meta': {'object_name': 'Contest_Problem'},
            'contest': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['compile.Contest']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'problem': ('django.db.models.fields.TextField', [], {}),
            'testcase_in_1': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'testcase_in_2': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'testcase_in_3': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'testcase_out_1': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'testcase_out_2': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'testcase_out_3': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'title': ('django.db.models.fields.TextField', [], {})
        },
        'compile.contest_submission': {
            'Meta': {'object_name': 'Contest_Submission', 'ordering': "['-created']"},
            'contest_problem': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['compile.Contest_Problem']"}),
            'created': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'fname': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'compile.submission_result': {
            'Meta': {'object_name': 'Submission_Result'},
            'average_time': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'result_type': ('django.db.models.fields.IntegerField', [], {}),
            'submission': ('django.db.models.fields.related.OneToOneField', [], {'unique': 'True', 'to': "orm['compile.Contest_Submission']"}),
            'testcase_passed': ('django.db.models.fields.IntegerField', [], {'default': '0'})
        },
        'compile.submission_try': {
            'Meta': {'object_name': 'Submission_Try'},
            'finput': ('django.db.models.fields.files.FileField', [], {'blank': 'True', 'max_length': '100'}),
            'fname': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'contenttypes.contenttype': {
            'Meta': {'object_name': 'ContentType', 'db_table': "'django_content_type'", 'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['compile']