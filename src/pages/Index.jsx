import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to the Object Detection App</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/live-feed" className="block">
            <Button className="w-full">Start Live Feed</Button>
          </Link>
          <Link to="/history" className="block">
            <Button className="w-full" variant="outline">View History</Button>
          </Link>
          <Link to="/settings" className="block">
            <Button className="w-full" variant="outline">Open Settings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;