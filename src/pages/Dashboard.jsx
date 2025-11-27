import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CustomerList from "../components/CustomerList";
import DCL from "../components/DCL";
import Deferrals from "../components/Deferrals";
import Reports from "../components/Reports";

// Sample loans with DCL numbers
const loansData = [
  { dclNo: "DCL001", loanNo: "LN001", customer: "John Pombe", type: "Mortgage", amount: 120000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }, { name: "Address Proof", status: "Submitted" }] },
  { dclNo: "DCL002", loanNo: "LN002", customer: "Mary Magufuli", type: "Sme Loan", amount: 50000, status: "Approved", documents: [{ name: "Business License", status: "Submitted" }, { name: "Tax Return", status: "Submitted" }] },
  { dclNo: "DCL003", loanNo: "LN003", customer: "Alice Maina", type: "Mortgage", amount: 200000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }, { name: "Income Statement", status: "Submitted" }] },
  { dclNo: "DCL004", loanNo: "LN004", customer: "Bob Smacker", type: "Sme Loan", amount: 15000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL005", loanNo: "LN005", customer: "Charlie Mamba", type: "Sme Loan", amount: 75000, status: "Approved", documents: [{ name: "Business License", status: "Submitted" }] },
  { dclNo: "DCL006", loanNo: "LN006", customer: "Indah Prince", type: "Mortgage", amount: 180000, status: "Approved", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL007", loanNo: "LN007", customer: "The Hunt", type: "Sme Loan", amount: 20000, status: "Pending", documents: [{ name: "Income Statement", status: "Submitted" }] },
  { dclNo: "DCL008", loanNo: "LN008", customer: "Fiona Msupa", type: "Sme Loan", amount: 95000, status: "Pending", documents: [{ name: "Business License", status: "Submitted" }] },
  { dclNo: "DCL009", loanNo: "LN009", customer: "George Gala", type: "Mortgage", amount: 250000, status: "Approved", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL010", loanNo: "LN010", customer: "Hannah Montana", type: "Sme Loan", amount: 10000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL011", loanNo: "LN011", customer: "Ian Smooder", type: "Sme Loan", amount: 85000, status: "Approved", documents: [{ name: "Business License", status: "Submitted" }] },
  { dclNo: "DCL012", loanNo: "LN012", customer: "Julia Pop", type: "Mortgage", amount: 220000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL013", loanNo: "LN013", customer: "Kevin Topla ", type: "Sme Loan", amount: 18000, status: "Pending", documents: [{ name: "Income Statement", status: "Submitted" }] },
  { dclNo: "DCL014", loanNo: "LN014", customer: "Linda ", type: "Sme Loan", amount: 60000, status: "Approved", documents: [{ name: "Business License", status: "Submitted" }] },
  { dclNo: "DCL015", loanNo: "LN015", customer: "Mike Tyson", type: "Mortgage", amount: 300000, status: "Pending", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL016", loanNo: "LN016", customer: "Nina Dobrev", type: "Personal Loan", amount: 12000, status: "Pending", documents: [{ name: "Income Statement", status: "Submitted" }] },
  { dclNo: "DCL017", loanNo: "LN017", customer: "Oscar Isaac", type: "Sme Loan", amount: 70000, status: "Pending", documents: [{ name: "Business License", status: "Submitted" }] },
  { dclNo: "DCL018", loanNo: "LN018", customer: "Pam Beesly", type: "Mortgage", amount: 190000, status: "Approved", documents: [{ name: "ID Proof", status: "Submitted" }] },
  { dclNo: "DCL019", loanNo: "LN019", customer: "Quentin Tarantino", type: "Sme Loan", amount: 15000, status: "Pending", documents: [{ name: "Income Statement", status: "Submitted" }] },
  { dclNo: "DCL020", loanNo: "LN020", customer: "Rachel Green", type: "Sme Loan", amount: 80000, status: "Approved", documents: [{ name: "Business License", status: "Submitted" }] },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("My Queue");
  const [selectedLoanNo, setSelectedLoanNo] = useState(null);
  const [activeDeferralTab, setActiveDeferralTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLoans, setFilteredLoans] = useState(
    loansData.filter((loan) => loan.status === "Pending")
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = loansData.filter(
      (loan) =>
        loan.loanNo.toLowerCase() === query.toLowerCase() ||
        loan.customer.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLoans(filtered.length > 0 ? filtered : []);
    setActivePage("My Queue");
    setSelectedLoanNo(null);
  };

  const handleSetActivePage = (page) => {
    setActivePage(page);
    setSelectedLoanNo(null);
    if (page !== "Deferrals") setActiveDeferralTab(null);

    if (page === "My Queue") {
      setFilteredLoans(loansData.filter((loan) => loan.status === "Pending"));
    } else if (page === "Complete DCLs") {
      setFilteredLoans(loansData.filter((loan) => loan.status === "Approved"));
    }
  };

  const selectedLoan = loansData.find((loan) => loan.loanNo === selectedLoanNo);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={handleSetActivePage}
        activeDeferralTab={activeDeferralTab}
        setActiveDeferralTab={setActiveDeferralTab}
      />

      <div className="flex-1 transition-all duration-300">
        <Topbar onSearch={handleSearch} />

        <div className="p-6">
          {(activePage === "My Queue" || activePage === "Complete DCLs") && (
            <>
              {filteredLoans.length === 0 && searchQuery && (
                <p className="text-red-500 font-semibold mb-4">No loans found.</p>
              )}

              {!selectedLoanNo ? (
                <CustomerList
                  loans={filteredLoans}
                  onSelectCustomer={setSelectedLoanNo}
                  highlightedLoanNo={searchQuery}
                />
              ) : (
                <DCL
                  loan={filteredLoans.find((l) => l.loanNo === selectedLoanNo)}
                  onBack={() => setSelectedLoanNo(null)}
                />
              )}
            </>
          )}

          {activePage === "Deferrals" && activeDeferralTab && (
            <Deferrals activeTab={activeDeferralTab} />
          )}

          {activePage === "Reports" && <Reports loans={loansData} />}
        </div>
      </div>
    </div>
  );
}
