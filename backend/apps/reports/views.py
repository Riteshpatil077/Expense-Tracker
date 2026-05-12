# pyrefly: ignore [missing-import]
from rest_framework.views import APIView
# pyrefly: ignore [missing-import]
from rest_framework.response import Response
# pyrefly: ignore [missing-import]
from rest_framework import status
# pyrefly: ignore [missing-import]
from .tasks import generate_pdf_report, generate_excel_report


class ReportView(APIView):
    def post(self, request):
        month = request.data.get('month')
        year = request.data.get('year')
        report_type = request.data.get('type', 'pdf')

        if not month or not year:
            return Response(
                {'error': 'month and year are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if report_type == 'excel':
            task = generate_excel_report.delay(request.user.id, month, year)
        else:
            task = generate_pdf_report.delay(request.user.id, month, year)

        return Response({
            'message': 'Report generation started. You will receive an email shortly.',
            'task_id': task.id,
            'type': report_type,
        })
