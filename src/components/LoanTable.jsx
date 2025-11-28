import ProgressBar from "./ProgressBar";

const loans = [
  { loanNo: "LN001", customer: "John Doe", type: "Mortgage", progress: 67 },
  { loanNo: "LN002", customer: "Mary Jane", type: "Sme Loan", progress: 75 },
];

export default function LoanTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="pb-3">Loan No</th>
            <th className="pb-3">Customer</th>
            <th className="pb-3">Loan Type</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {loans.map(({ loanNo, customer, type, progress }) => (
            <tr key={loanNo} className="border-b">
              <td className="py-4">{loanNo}</td>
              <td>{customer}</td>
              <td>{type}</td>
              <td className="w-1/3">
                <ProgressBar progress={progress} />
              </td>
              <td>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Open Checklist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
