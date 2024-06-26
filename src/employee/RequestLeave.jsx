import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

function RequestLeave() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    empId: null,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("PENDING");

  const userId = localStorage.getItem("userId");
  // const leaveId = localStorage.getItem("leaveId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
          if (response.status === 200) {
            setUser(response.data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const leaveRequest = {
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
        leaveType,
        reason,
        status,
        employee: {
          empId: userId
        },
      };
  
      const response = await axios.post(`http://localhost:8080/api/leave-requests`, leaveRequest);
  
      if (response.status === 201) {
        const createdLeaveRequest = response.data; // Assuming the leave request object with leaveId is returned in the response
        const { leaveId } = createdLeaveRequest; // Extracting the leaveId from the response
  
        console.log("Leave request submitted successfully with leaveId:", leaveId);
  
        // Save leaveId to localStorage or state as needed
        localStorage.setItem('leaveId', leaveId);
  
        // Resetting form fields
        setStartDate(null);
        setEndDate(null);
        setLeaveType("");
        setReason("");
        setStatus("PENDING");
      } else {
        console.error("Error submitting leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error); 
    }
  };
  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Request a leave</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apply Leave</AlertDialogTitle>
          <AlertDialogDescription >
            <div className="grid w-full items-center gap-4  " >
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[420px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[420px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select onValueChange={setLeaveType}>
                  <SelectTrigger id="leaveType">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>  
                  <SelectContent position="popper">
                    <SelectItem value="CASUAL">Casual leave</SelectItem>
                    <SelectItem value="HALF CASUAL">Half Casual leave</SelectItem>
                    <SelectItem value="MEDICAL">Medical leave</SelectItem>
                    <SelectItem value="HALF MEDICAL">Half Medical leave</SelectItem>
                    <SelectItem value="PRIVILEGED">Privileged leave</SelectItem>
                    <SelectItem value="HALF PRIVILEGED">Half Privileged leave</SelectItem>
                    <SelectItem value="UNPAID">Unpaid leave</SelectItem>
                    <SelectItem value="HALF UNPAID">Half Unpaid leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  placeholder="Write reason here..."
                  id="reason"
                  rows="4"
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='inline-block '>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RequestLeave;
