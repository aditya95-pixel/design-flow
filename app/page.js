"use client"; // Add this directive since we're using hooks
import { Button } from "../components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /workspace when component mounts
    router.push("/workspace");
  }, [router]);

  return (
    <div>
      {/* Optional: Show loading state or blank page during redirect */}
      <div className="flex items-center justify-center h-screen">
        <p>Redirecting to workspace...</p>
      </div>
    </div>
  );
}