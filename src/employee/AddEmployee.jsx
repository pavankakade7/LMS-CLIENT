import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios"; // Use axios for HTTP requests
import { useNavigate } from "react-router-dom"; // To navigate on successful sign-up
import DashboardLayout from "@/common/DashboardLayout";

import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBRadio 
} from 'mdb-react-ui-kit';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/adduser",
        {
          firstName,
          lastName,
          email,
          password,
          role,
        }
      );

      if (response.status === 200) {
        // User created successfully
        navigate("/login"); // Redirect to login after successful sign-up
      }
    } catch (error) {
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <DashboardLayout>
                   <form>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='First name' label='First name'
           required
           value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
            />

        </MDBCol>
        <MDBCol>
          <MDBInput id='Last name' label='Last name'
             required
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
              />
        </MDBCol>
      </MDBRow>

      <MDBInput wrapperClass='mb-4' type='Email' id='Email' label='Email'
       required
       value={email}
       onChange={(e) => setEmail(e.target.value)} />
      <MDBInput wrapperClass='mb-4' type='password' id='Password'  label='Password' />

      <div className="grid gap-2">
  <Label htmlFor="role">Role</Label>
  <RadioGroup
    id="role"
    value={role}
    onValueChange={(newValue) => setRole(newValue)}
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <MDBRadio
          name="role"
          value="ADMIN"
          id="role-admin"
          label="Admin"
          checked={role === "ADMIN"}
          onChange={() => setRole("ADMIN")}
        />
      </div>
      <div className="flex items-center">
        <MDBRadio
          name="role"
          value="USER"
          id="role-user"
          label="User"
          checked={role === "USER"}
          onChange={() => setRole("USER")}
        />
      </div>
    </div>
  </RadioGroup>
</div>

     <br />

      <MDBBtn className='mb-4' type='submit' block onClick={handleSignUp} >
        Save Changes
      </MDBBtn>
    </form>
    
    </DashboardLayout>
  );
};

export default AddEmployee;
