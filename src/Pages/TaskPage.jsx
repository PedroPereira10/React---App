import { ChevronLeft, Download } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const priority = searchParams.get("priority");

  const downloadPDF = () => {
    const pdf = new jsPDF();

    // Configurações do PDF
    const margin = 20;
    let yPosition = margin;
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Título do documento (centralizado)
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    const documentTitle = "Task Details";
    const documentTitleWidth = pdf.getTextWidth(documentTitle);
    const documentTitleX = (pageWidth - documentTitleWidth) / 2;

    pdf.text(documentTitle, documentTitleX, yPosition);
    yPosition += 20;

    // Linha separadora
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Título da tarefa (centralizado)
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    const titleText = title || "N/A";
    const titleWidth = pdf.getTextWidth(titleText);
    const titleX = (pageWidth - titleWidth) / 2;

    pdf.text(titleText, titleX, yPosition);
    yPosition += 20;

    // Descrição
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Description:", margin, yPosition);
    yPosition += 8;
    pdf.setFont("helvetica", "normal");

    // Quebrar texto da descrição se for muito longo
    const descriptionLines = pdf.splitTextToSize(
      description || "N/A",
      pageWidth - margin * 2
    );
    pdf.text(descriptionLines, margin, yPosition);
    yPosition += descriptionLines.length * 6 + 10;

    // Data
    pdf.setFont("helvetica", "bold");
    pdf.text("Date:", margin, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(date || "N/A", margin + 25, yPosition);
    yPosition += 12;

    // Horário
    pdf.setFont("helvetica", "bold");
    pdf.text("Time:", margin, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(time || "N/A", margin + 25, yPosition);
    yPosition += 12;

    // Prioridade
    pdf.setFont("helvetica", "bold");
    pdf.text("Priority:", margin, yPosition);
    pdf.setFont("helvetica", "normal");

    let priorityText = "N/A";
    if (priority === "low") priorityText = "Low";
    if (priority === "medium") priorityText = "Medium";
    if (priority === "high") priorityText = "High";

    pdf.text(priorityText, margin + 30, yPosition);

    // Data de geração do PDF
    yPosition += 25;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);

    // Salvar o PDF
    const fileName = `task-${
      title?.replace(/[^a-zA-Z0-9]/g, "-") || "details"
    }.pdf`;
    pdf.save(fileName);
  };

  return (
    <div className="min-h-screen w-full bg-slate-500 p-4 md:p-6">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="flex justify-center relative mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-slate-100 hover:text-slate-300 transition-colors p-1"
          >
            <ChevronLeft size={24} />
          </button>
          <Title>Task Details</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-lg md:text-xl font-bold text-slate-600 text-center mb-3">
            {title}
          </h2>
          <div className="space-y-2">
            <p className="text-slate-600 text-sm md:text-base">{description}</p>
            <p className="text-slate-600 text-sm md:text-base">Date: {date}</p>
            <p className="text-slate-600 text-sm md:text-base">At: {time}</p>
            <p className="text-slate-600 flex items-center gap-1 text-sm md:text-base">
              Priority:
              {priority === "low" && <span>🟢 Low</span>}
              {priority === "medium" && <span>🟡 Medium</span>}
              {priority === "high" && <span>🔴 High</span>}
            </p>
          </div>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <button
            onClick={downloadPDF}
            className="bg-slate-500 hover:bg-slate-600 text-white w-full p-3 rounded-md flex justify-center items-center gap-2 transition-colors font-medium text-sm md:text-base"
          >
            <Download size={18} />
            <span className="hidden sm:inline">
              Download Task Details as PDF
            </span>
            <span className="sm:hidden">Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
