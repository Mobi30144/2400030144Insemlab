import EmployeeTable from "@/components/EmployeeTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Employee Data - Sortable Table</h1>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default Index;
