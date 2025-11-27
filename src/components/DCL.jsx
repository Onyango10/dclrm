import { Table, Button } from "antd";

export default function DCL({ loan, onBack }) {
  if (!loan) return null;

  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={status === "Submitted" ? "text-green-600" : "text-red-600"}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <p><strong>Customer Name:</strong> {loan.customer}</p>
          <p><strong>Loan Number:</strong> {loan.loanNo}</p>
          <p><strong>Loan Amount:</strong> ${loan.amount.toLocaleString()}</p>
        </div>
        <Button onClick={onBack} size="small">
          Back
        </Button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Documents</h3>
      <Table
        columns={columns}
        dataSource={loan.documents.map((doc, idx) => ({ ...doc, key: idx }))}
        size="small" // compact
        pagination={false} // small number of documents, no pagination
      />
    </div>
  );
}
