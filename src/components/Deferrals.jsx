import { Table, Input, Button, Form } from "antd";
import { useState, useEffect } from "react";

export default function Deferrals({ activeTab, deferralData }) {
  const [deferrals, setDeferrals] = useState([
    {
      loanNo: "LN001",
      customer: "John Doe",
      document: "ID Proof",
      duration: "1 Month",
      reason: "Incomplete info",
      status: "Pending",
    },
    {
      loanNo: "LN002",
      customer: "Mary Jane",
      document: "Business License",
      duration: "2 Weeks",
      reason: "Need updated license",
      status: "Approved",
    },
  ]);

  const [form] = Form.useForm();

  // ⭐ Auto-fill form fields when deferralData changes
  useEffect(() => {
    if (activeTab === "Create Deferral" && deferralData) {
      form.setFieldsValue({
        loanNo: deferralData.loanNo || "",
        customer: deferralData.customer || "",
        document: deferralData.document || "",
        dclNo: deferralData.dclNo || "",
        duration: "",
        reason: "",
      });
    }
  }, [activeTab, deferralData, form]);

  const handleCreateDeferral = (values) => {
    const newDeferral = { ...values, status: "Pending" };
    setDeferrals([newDeferral, ...deferrals]);
    form.resetFields();
  };

  const columns = [
    { title: "Loan Number", dataIndex: "loanNo", key: "loanNo" },
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Document", dataIndex: "document", key: "document" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={status === "Approved" ? "text-green-600" : "text-yellow-600"}>
          {status}
        </span>
      ),
    },
  ];

  // ⭐ Create Deferral Tab
  if (activeTab === "Create Deferral") {
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateDeferral}
        className="max-w-md"
      >
        <Form.Item name="loanNo" label="Loan Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="document"
          label="Document to be Deferred"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="dclNo" label="DCL Number">
          <Input disabled />
        </Form.Item>
        <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
          <Input placeholder="e.g., 1 Month" />
        </Form.Item>
        <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Deferral Request
          </Button>
        </Form.Item>
      </Form>
    );
  }

  // ⭐ Pending Approval Tab
  if (activeTab === "Pending Approval") {
    return (
      <Table
        columns={columns}
        dataSource={deferrals
          .filter((d) => d.status === "Pending")
          .map((d) => ({ ...d, key: d.loanNo + d.document }))}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    );
  }

  return null;
}
