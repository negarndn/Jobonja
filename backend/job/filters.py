from django_filters import rest_framework as filters
from .models import Job


class JobsFilter(filters.FilterSet):
    min_salary = filters.NumberFilter(field_name="salary" or 0, lookup_expr='gte')
    max_salary = filters.NumberFilter(field_name="salary" or 100000000, lookup_expr='lte')
    class Meta:
        model = Job
        fields = ('education', 'jobType', 'experience', 'min_salary', 'max_salary')