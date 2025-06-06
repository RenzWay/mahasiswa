"use client";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
        action=""
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Login
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-blue-700 font-medium">
            Email
          </label>
          <input
            className="border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-blue-700 placeholder-blue-300"
            type="email"
            id="email"
            placeholder="you@example.com"
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-blue-700 font-medium">
            Password
          </label>
          <input
            className="border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-blue-700 placeholder-blue-300"
            type="password"
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        <input
          type="submit"
          value="Sign In"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2 cursor-pointer transition"
        />
      </form>
    </section>
  );
}
