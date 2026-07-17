"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Plug, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { teamApi, userApi, workspaceApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";

interface TeamMemberRow {
  _id: string;
  role: string;
  status: string;
  user?: { firstName: string; lastName: string; email: string; avatar?: string };
}

function SettingsPageContent() {
  const { user, workspace, refreshUser } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [changingPassword, setChangingPassword] = React.useState(false);

  const [team, setTeam] = React.useState<TeamMemberRow[]>([]);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviting, setInviting] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBio(user.bio ?? "");
    }
  }, [user]);

  React.useEffect(() => {
    if (!workspace) return;
    teamApi
      .members(workspace._id)
      .then((members) => setTeam(members as TeamMemberRow[]))
      .catch(() => setTeam([]));
  }, [workspace]);

  async function handleSaveProfile() {
    setSaving(true);
    try {
      await userApi.updateProfile({ firstName, lastName, bio });
      await refreshUser();
      toast.success("Settings saved successfully!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not save your profile.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      await userApi.uploadAvatar(file);
      await refreshUser();
      toast.success("Avatar updated!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not upload your avatar.";
      toast.error(message);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleChangePassword() {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setChangingPassword(true);
    try {
      await userApi.changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password changed successfully!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not change your password.";
      toast.error(message);
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleInvite() {
    if (!workspace || !inviteEmail) return;
    setInviting(true);
    try {
      await workspaceApi.invite(workspace._id, { email: inviteEmail, role: "editor" });
      toast.success(`Invitation sent to ${inviteEmail}.`);
      setInviteEmail("");
      const members = await teamApi.members(workspace._id);
      setTeam(members as TeamMemberRow[]);
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not send the invitation.";
      toast.error(message);
    } finally {
      setInviting(false);
    }
  }

  const initials = user ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase() : "ZA";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account, team, and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <Button size="sm" variant="outline" disabled={uploadingAvatar} onClick={() => fileInputRef.current?.click()}>
                  {uploadingAvatar && <Loader2 className="size-3.5 animate-spin" />}
                  Change Photo
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WEBP or GIF.</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} type="email" disabled />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label>Bio</Label>
              <Textarea placeholder="Tell us about yourself..." rows={3} value={bio} onChange={(e) => setBio(e.target.value)} maxLength={280} />
            </div>

            <Button className="mt-6" onClick={handleSaveProfile} disabled={saving}>
              {saving && <Loader2 className="size-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Current password</Label>
                <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>New password</Label>
                <Input type="password" minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
            </div>
            <Button className="mt-6" onClick={handleChangePassword} disabled={changingPassword}>
              {changingPassword && <Loader2 className="size-4 animate-spin" />}
              Update Password
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="mt-6">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Plug className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Manage your connected channels</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect Facebook, Instagram, LinkedIn, X, and more from the dedicated Connect Channels page.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/connect-channels">Go to Connect Channels</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="teammate@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleInvite} disabled={inviting || !inviteEmail}>
              {inviting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
              Invite Member
            </Button>
          </div>
          {team.length > 0 ? (
            team.map((member) => (
              <div key={member._id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={member.user?.avatar} />
                    <AvatarFallback>{member.user?.firstName?.[0] ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {member.user ? `${member.user.firstName} ${member.user.lastName}` : "Pending member"}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.user?.email}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {member.role}
                </Badge>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">No team members yet.</p>
          )}
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current plan</p>
                <p className="text-2xl font-semibold capitalize">{workspace?.plan ?? "Free"}</p>
              </div>
              <Button variant="outline" asChild>
                <a href="/pricing">Upgrade Plan</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Manage billing and payment methods from the Pricing page. Stripe checkout is wired up on the backend
              (<code>/api/v1/payments/checkout</code>) and ready once you add your Stripe keys.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          {[
            { label: "Post published confirmations", desc: "Get notified when a scheduled post goes live." },
            { label: "Failed post alerts", desc: "Get notified immediately if a post fails to publish." },
            { label: "Weekly performance summary", desc: "A weekly digest of your top analytics." },
            { label: "Team activity", desc: "Notifications for comments, approvals, and mentions." },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <SettingsPageContent />
    </React.Suspense>
  );
}
