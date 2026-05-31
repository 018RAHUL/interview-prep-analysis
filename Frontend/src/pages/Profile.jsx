import { useEffect, useState } from "react";

import { getProfile } from "../api/auth";
import { getAnalytics } from "../api/answers";

import AnalyticsCard from "../components/AnalyticsCard";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [analytics, setAnalytics] = useState({
    totalAnswers: 0,
    averageWords: 0,
    totalQuestionsAttempted: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const profileRes = await getProfile();

      const analyticsRes =
        await getAnalytics();

      setUser(profileRes.data.data);

      setAnalytics(
        analyticsRes.data.data
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Profile
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {user.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user.role}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          Performance Analytics
        </h2>

        <div className="flex flex-wrap gap-5">
          <AnalyticsCard
            title="Total Answers"
            value={analytics.totalAnswers}
          />

          <AnalyticsCard
            title="Average Words"
            value={analytics.averageWords}
          />

          <AnalyticsCard
            title="Questions Attempted"
            value={
              analytics.totalQuestionsAttempted
            }
          />
        </div>
      </div>
    </div>
  );
}