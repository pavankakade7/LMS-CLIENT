import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/common/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listEmployees, listUsers } from '@/services/EmployeeServices';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listUsers()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <DashboardLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 px-5 text-sm font-medium lg:px-6 ">
        {/* <Card>
          <CardHeader>
            <CardTitle>List of Employees</CardTitle>
          </CardHeader> */}
          <ScrollArea className="h-50 rounded-md border">
            <CardContent>
              <Table className="w-full table-auto">
                {/* <TableCaption>A list of your employees.</TableCaption> */}
                <TableHeader>
                  <TableRow >
                    <TableHead className="px-5 text-sm font-medium lg:px-6">No</TableHead>
                    <TableHead className="px-4 py-2">First Name</TableHead>
                    <TableHead className="px-4 py-2">Last Name</TableHead>
                    <TableHead className="px-4 py-2">Email</TableHead>
                    <TableHead className="px-4 py-2">Role</TableHead>
                    {/* <TableHead className="px-4 py-2">Phone</TableHead>
                    <TableHead className="px-4 py-2">Gender</TableHead>
                    <TableHead className="px-4 py-2">Department</TableHead>
                    <TableHead className="px-4 py-2">Title</TableHead> */}
                    {/* <TableHead className="px-4 py-2">Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.userId}>
                      <TableCell className="px-4 py-2">{employee.userId}</TableCell>
                      <TableCell className="px-4 py-2">{employee.firstName}</TableCell>
                      <TableCell className="px-4 py-2">{employee.lastName}</TableCell>
                      <TableCell className="px-4 py-2">{employee.email}</TableCell>
                      <TableCell className="px-4 py-2">{employee.role}</TableCell>
                      {/* <TableCell className="px-4 py-2">{employee.phone}</TableCell>
                      <TableCell className="px-4 py-2">{employee.gender}</TableCell>
                      <TableCell className="px-4 py-2">{employee.department}</TableCell>
                      <TableCell className="px-4 py-2">{employee.title}</TableCell> */}
                      {/* <TableCell className="px-4 py-2">Actions</TableCell> Add appropriate actions */}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  {/* <TableRow>
                    <TableCell colSpan={9} className="text-right">
                      Total Employees: {employees.length}
                    </TableCell>
                  </TableRow> */}
                </TableFooter>
              </Table>
            </CardContent>
          </ScrollArea>
        {/* </Card> */}
      </main>
    </DashboardLayout>
  );
};

export default EmployeeList;
