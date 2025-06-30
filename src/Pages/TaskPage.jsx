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
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 mb-6 text-slate-100"
          >
            <ChevronLeft />
          </button>
          <Title>Task Details</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-slate-600 text-center">
            {title}
          </h2>
          <p className="text-slate-600">{description}</p>
          <p className="text-slate-600">Date: {date}</p>
          <p className="text-slate-600">At: {time}</p>
          <p className="text-slate-600 flex items-center gap-1">
            Priority :{priority === "low" && <span>🟢 Low</span>}
            {priority === "medium" && <span>🟡 Medium</span>}
            {priority === "high" && <span>🔴 High</span>}
          </p>
        </div>

        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow ">
          <button
            onClick={downloadPDF}
            className="bg-slate-500 text-left w-full text-white p-2 rounded-md flex justify-center gap-2"
          >
            <Download size={20} />
            Download Task Details as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
