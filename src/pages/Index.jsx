import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Object Detection App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Feed</CardTitle>
            <CardDescription>Start real-time object detection</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/live-feed">
              <Button className="w-full">Go to Live Feed</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>View past detection results</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/history">
              <Button className="w-full" variant="outline">View History</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure app preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/settings">
              <Button className="w-full" variant="outline">Open Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;