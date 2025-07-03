import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from 'react-redux';


function AppliedSchemeTable() {
    //all the applications, populated with scheme & org
    const { allAppliedSchemes } = useSelector((store) => store.scheme);

  return (
    <div>
      <Table>
        <TableCaption>List of applied Schemes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Scheme Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedSchemes.length <= 0 ? (
            <span>You haven't applied for any scheme.</span>
          ) : (
            allAppliedSchemes.map((appliedScheme) => (
              <TableRow>
                <TableCell>{appliedScheme?.createdAt.split('T')[0]}</TableCell>
                <TableCell>{appliedScheme?.scheme?.title}</TableCell>
                <TableCell>
                  {appliedScheme?.scheme?.organization?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                  className={`${
                    appliedScheme?.status === "rejected"
                      ? "bg-red-400"
                      : appliedScheme.status === "pending"
                      ? "bg-gray-400"
                      : "bg-green-400"
                  }`}
                  >
                    {appliedScheme?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default AppliedSchemeTable