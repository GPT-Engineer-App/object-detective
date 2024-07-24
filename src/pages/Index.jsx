import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Object Detection App</h1>
      <Card>
        <CardHeader>
          <CardTitle>Live Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Start real-time object detection using your camera.</p>
          <Link to="/live-feed">
            <Button className="w-full">Go to Live Feed</Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Detection History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">View past detection results and statistics.</p>
          <Link to="/history">
            <Button className="w-full" variant="outline">View History</Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Configure app settings and preferences.</p>
          <Link to="/settings">
            <Button className="w-full" variant="outline">Open Settings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;