import { Table } from "antd";

export default function CustomerList({ loans, onSelectCustomer, highlightedLoanNo }) {
  const columns = [
    { title: "DCL Number", dataIndex: "dclNo", key: "dclNo" }, // new column added
    { title: "Loan Number", dataIndex: "loanNo", key: "loanNo" },
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Loan Type", dataIndex: "type", key: "type" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amt) => `$${amt.toLocaleString()}` },
    { title: "Status", dataIndex: "status", key: "status" }, // stays in original order
  ];

  const dataSource = loans.map((loan) => ({
    key: loan.loanNo,
    ...loan,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size="middle"
      onRow={(record) => ({
        onClick: () => onSelectCustomer(record.loanNo),
      })}
      rowClassName={(record) =>
        highlightedLoanNo && record.loanNo.toLowerCase() === highlightedLoanNo.toLowerCase()
          ? "bg-yellow-100"
          : ""
      }
    />
  );
}
