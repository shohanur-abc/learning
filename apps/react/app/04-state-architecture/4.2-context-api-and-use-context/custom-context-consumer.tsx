"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Shield, UserCheck, LogIn, LogOut, KeyRound } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.২ Context API & useContext: Custom Context Consumer (Auth & Roles)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * প্রপ ড্রিলিং (Prop Drilling) হলো একটি বড় অ্যান্টি-প্যাটার্ন যেখানে মধ্যবর্তী
 * কম্পোনেন্টগুলোর কোনো ডেটা প্রয়োজন না থাকা সত্ত্বেও শুধু নিচের চাইল্ডে পৌঁছে দেওয়ার জন্য
 * প্রপস পাস করতে বাধ্য হতে হয়।
 * Context ব্যবহারের ফলে মধ্যবর্তী কোনো কম্পোনেন্টকে স্পর্শ না করেই গভীর চাইল্ড
 * সরাসরি `useAuth()` দিয়ে ইউজার ও পারমিশন স্টেট এক্সেস করতে পারে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `DashboardNavbar` মধ্যবর্তী কম্পোনেন্ট হওয়া সত্ত্বেও এতে কোনো user প্রপস নেই।
 * ২. গভীর চাইল্ড `UserProfileBadge` সরাসরি কনটেক্সট থেকে অথ স্টেট গ্রহণ ও আপডেট করছে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type UserRole = "Admin" | "Developer" | "Guest"

export interface AuthUser {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly role: UserRole
}

interface AuthContextType {
  readonly user: AuthUser | null
  readonly loginAs: (role: UserRole) => void
  readonly logout: () => void
  readonly switchRole: (newRole: UserRole) => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

/** অথ প্রোভাইডার */
export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>({
    id: "usr_101",
    name: "সাকিব হাসান",
    email: "shakib@learning.dev",
    role: "Developer",
  })

  const loginAs = (role: UserRole) => {
    setUser({
      id: "usr_101",
      name: role === "Admin" ? "অ্যাডমিন ইউজার" : "সাকিব হাসান",
      email: `${role.toLowerCase()}@learning.dev`,
      role,
    })
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole })
    }
  }

  const value = React.useMemo<AuthContextType>(
    () => ({ user, loginAs, logout, switchRole }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** কাস্টম কনটেক্সট কনজিউমার হুক */
export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth অবশ্যই একটি <AuthProvider> এর ভেতর কল করতে হবে।")
  }
  return context
}

// ── লেয়ার ৩ (গভীরতম চাইল্ড): সরাসরি useAuth() ব্যবহার করছে ─────────────────
function UserProfileBadge() {
  const { user, logout, switchRole } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
        <span>বর্তমানে কোনো ইউজার সাইন-ইন করা নেই।</span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 shadow-2xs">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">{user.name}</span>
            <Badge
              variant={user.role === "Admin" ? "destructive" : "secondary"}
              className="text-[10px] px-1.5 py-0"
            >
              {user.role}
            </Badge>
          </div>
          <span className="text-[11px] text-muted-foreground">{user.email}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <select
          value={user.role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="ইউজার রোল পরিবর্তন"
        >
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="Guest">Guest</option>
        </select>
        <Button
          size="sm"
          variant="outline"
          onClick={logout}
          className="gap-1 text-xs text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-3" />
          লগআউট
        </Button>
      </div>
    </div>
  )
}

// ── লেয়ার ২ (মধ্যবর্তী চাইল্ড): লক্ষ্য করুন এতে কোনো User প্রপস নেই! ──────────
function DashboardNavbar() {
  return (
    <div className="space-y-2 rounded-lg border border-border/80 bg-muted/30 p-3.5">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground border-b border-border/50 pb-2">
        <span className="flex items-center gap-1.5">
          <Shield className="size-3.5 text-primary" />
          ড্যাশবোর্ড নেভবার (মধ্যবর্তী লেয়ার - কোনো প্রপস নেই)
        </span>
        <span className="text-[11px] text-muted-foreground/80">Prop-Drilling Free</span>
      </div>

      {/* গভীর চাইল্ড রেন্ডার হচ্ছে */}
      <UserProfileBadge />
    </div>
  )
}

// ── লেয়ার ১ (লগইন টগল কন্ট্রোলার) ──────────────────────────────────────────
function AuthControlBar() {
  const { user, loginAs } = useAuth()

  if (user) return null

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
      <span className="text-xs text-muted-foreground">সাইন-ইন করতে একটি রোল নির্বাচন করুন:</span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => loginAs("Developer")}
          className="gap-1 text-xs"
        >
          <UserCheck className="size-3.5" />
          Developer
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={() => loginAs("Admin")}
          className="gap-1 text-xs"
        >
          <KeyRound className="size-3.5" />
          Admin
        </Button>
      </div>
    </div>
  )
}

/**
 * মূল কম্পোনেন্ট: কাস্টম কনটেক্সট কনজিউমার ডেমো
 */
export default function CustomContextConsumer() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Custom Consumer Hook: Auth & Hierarchy
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          Clean Architecture
        </Badge>
      </div>

      <AuthProvider>
        <div className="space-y-3">
          <AuthControlBar />
          <DashboardNavbar />
        </div>
      </AuthProvider>

      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
        ✨ <strong>আর্কিটেকচার বিশ্লেষণ:</strong> <code>DashboardNavbar</code> কম্পোনেন্টটির কোড লক্ষ্য করুন;
        এটি <code>UserProfileBadge</code> কে মাউন্ট করে কিন্তু ইউজারের কোনো তথ্য প্রপস আকারে গ্রহণ বা পাস করে না।
      </div>
    </div>
  )
}
