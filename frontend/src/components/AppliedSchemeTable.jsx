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

const allAppliedSchemes = [1,2,3,4]

function AppliedSchemeTable() {
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
            <span>You haven't applied any job yet.</span>
          ) : (
            allAppliedSchemes.map((appliedScheme) => (
              <TableRow>
                <TableCell>Scheme</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell className="text-right">
                  <Badge
                    // className={`${
                    //   appliedJob?.status === "rejected"
                    //     ? "bg-red-400"
                    //     : appliedJob.status === "pending"
                    //     ? "bg-gray-400"
                    //     : "bg-green-400"
                    // }`}
                  >
                    Status
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