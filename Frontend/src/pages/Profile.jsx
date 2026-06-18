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

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData =
    async () => {
      try {
        const profileRes =
          await getProfile();

        const analyticsRes =
          await getAnalytics();

        setUser(
          profileRes.data.data
        );

        setAnalytics(
          analyticsRes.data.data
        );
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Loading Profile...
          </h2>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-slate-400
            "
          >
            Fetching your account
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-red-300
            bg-red-50
            dark:border-red-700
            dark:bg-red-900/20
            p-8
            text-center
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-red-600
            "
          >
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero Card */}
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-700
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-white/20
              text-4xl
              font-bold
            "
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="mt-2 text-violet-100">
              {user.email}
            </p>

            <span
              className="
                mt-3
                inline-block
                rounded-full
                bg-white/20
                px-4
                py-1
                text-sm
              "
            >
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-md
        "
      >
        <h2
          className="
            mb-6
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Account Information
        </h2>

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >
          <div>
            <p
              className="
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              Full Name
            </p>

            <p
              className="
                mt-1
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {user.name}
            </p>
          </div>

          <div>
            <p
              className="
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              Email Address
            </p>

            <p
              className="
                mt-1
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {user.email}
            </p>
          </div>

          {/* <div>
            <p
              className="
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              Role
            </p>

            <p
              className="
                mt-1
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {user.role}
            </p>
          </div> */}
        </div>
      </div>

      {/* Analytics */}
      <div>
        <h2
          className="
            mb-5
            text-3xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Performance Analytics
        </h2>

        <div
          className="
            grid
            gap-6
            md:grid-cols-3
          "
        >
          <AnalyticsCard
            title="📝 Total Answers"
            value={
              analytics.totalAnswers
            }
          />

          <AnalyticsCard
            title="📊 Average Words"
            value={
              analytics.averageWords
            }
          />

          <AnalyticsCard
            title="🎯 Questions Attempted"
            value={
              analytics.totalQuestionsAttempted
            }
          />
        </div>
      </div>
    </div>
  );
}