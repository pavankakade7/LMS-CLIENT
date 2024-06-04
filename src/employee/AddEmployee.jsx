import React, { useState } from "react";
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

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/adduser", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

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
      <Card>
        <CardHeader>
          <CardTitle className=' justify-center'>Add Employee</CardTitle>
          <CardDescription>Fill out the form to add a new employee.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role">Role</Label>
              <RadioGroup
                id="role"
                value={role}
                onValueChange={(newValue) => setRole(newValue)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <RadioGroupItem
                      name="role"
                      value="ADMIN"
                      id="role-admin"
                      label="Admin"
                      checked={role === "ADMIN"}
                      onChange={() => setRole("ADMIN")}
                    />
                    <Label htmlFor="role-admin">Admin</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      name="role"
                      value="USER"
                      id="role-user"
                      label="User"
                      checked={role === "USER"}
                      onChange={() => setRole("USER")}
                    />
                    <Label htmlFor="role-user">User</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="mb-4" block>
              Save Changes
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddEmployee;
