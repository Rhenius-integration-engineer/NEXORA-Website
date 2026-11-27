"use client";

import { type FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Enquiry = {
  id: string; created_at: string; status: string; name: string; email: string;
  phone: string | null; company: string | null; service_interest: string;
  budget_range: string | null; timeline: string | null; message: string;
};
const statuses = ["new", "contacted", "qualified", "proposal_sent", "won", "lost", "spam"];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [items, setItems] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  async function loadEnquiries() {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase.from("project_enquiries").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    setItems((data ?? []) as Enquiry[]);
  }

  useEffect(() => {
    let alive = true;
    try {
      const supabase = getSupabaseBrowserClient();
      supabase.auth.getSession().then(async ({ data }) => {
        if (!alive || !data.session) return;
        setUserEmail(data.session.user.email ?? "Signed in");
        try { await loadEnquiries(); } catch { setNotice("Your account is signed in, but does not have admin access to enquiry records."); }
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!alive) return;
        setUserEmail(session?.user.email ?? null);
        if (session) loadEnquiries().catch(() => setNotice("This account does not have permission to view enquiry records."));
        else setItems([]);
      });
      return () => { alive = false; listener.subscription.unsubscribe(); };
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Supabase is not configured.");
    }
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setPassword("");
      setNotice("Signed in. Loading your enquiries…");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Sign-in failed."); }
    finally { setBusy(false); }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("project_enquiries").update({ status }).eq("id", id);
      if (error) throw error;
      setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
      setSelected((current) => current?.id === id ? { ...current, status } : current);
      setNotice("Enquiry status updated.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not update status."); }
  }

  async function signOut() {
    try { await getSupabaseBrowserClient().auth.signOut(); setUserEmail(null); setItems([]); setSelected(null); setNotice("Signed out."); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Could not sign out."); }
  }

  const visible = items.filter((item) => filter === "all" || item.status === filter);

  return <section className="admin-page"><div className="shell admin-shell"><div className="admin-heading"><div><p className="eyebrow eyebrow--green">NEXORA / PRIVATE WORKSPACE</p><h1>Enquiry <em>desk.</em></h1><p>Keep conversations organised and make the next action clear.</p></div>{userEmail && <button className="button button--quiet" onClick={signOut}>Sign out ↗</button>}</div>
    {notice && <p className="admin-notice" role="status">{notice}</p>}
    {!userEmail ? <form className="admin-login" onSubmit={signIn}><p className="eyebrow eyebrow--green">TEAM ACCESS</p><h2>Sign in to continue.</h2><label className="field"><span>Email address</span><input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="field"><span>Password</span><input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label><button className="button button--dark" disabled={busy}>{busy ? "Signing in…" : "Sign in ↗"}</button><p className="admin-footnote">Access is limited by Supabase authentication and database row-level security. An account alone does not grant access; the trusted admin claim is required.</p></form> : <><div className="admin-summary"><div><span>ALL ENQUIRIES</span><b>{items.length}</b></div><div><span>NEW</span><b>{items.filter((item) => item.status === "new").length}</b></div><div><span>QUALIFIED</span><b>{items.filter((item) => item.status === "qualified").length}</b></div><div><span>WON</span><b>{items.filter((item) => item.status === "won").length}</b></div></div><div className="admin-toolbar"><div><h2>Recent enquiries</h2><p>{visible.length} records shown · latest 200</p></div><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter enquiries"><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Contact</th><th>Service</th><th>Received</th><th>Status</th><th /></tr></thead><tbody>{visible.map((item) => <tr key={item.id}><td><b>{item.name}</b><small>{item.email}</small></td><td>{item.service_interest}</td><td>{new Date(item.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td><td><span className={`status-dot status-dot--${item.status}`} />{item.status.replaceAll("_", " ")}</td><td><button className="table-open" onClick={() => setSelected(item)}>Open ↗</button></td></tr>)}</tbody></table>{visible.length === 0 && <div className="admin-empty">No enquiries in this view yet.</div>}</div></>}
  </div>
  {selected && <div className="drawer-scrim" role="presentation" onClick={() => setSelected(null)}><aside className="enquiry-drawer" role="dialog" aria-modal="true" aria-label="Enquiry details" onClick={(event) => event.stopPropagation()}><button className="drawer-close" onClick={() => setSelected(null)} aria-label="Close enquiry">×</button><p className="eyebrow eyebrow--green">ENQUIRY DETAILS</p><h2>{selected.name}</h2><a href={`mailto:${selected.email}`}>{selected.email}</a>{selected.phone && <p>{selected.phone}</p>}{selected.company && <p>{selected.company}</p>}<div className="drawer-data"><span>SERVICE</span><b>{selected.service_interest}</b><span>BUDGET</span><b>{selected.budget_range || "Not supplied"}</b><span>TIMELINE</span><b>{selected.timeline || "Not supplied"}</b><span>RECEIVED</span><b>{new Date(selected.created_at).toLocaleString("en-IN")}</b></div><p className="small-label">PROJECT BRIEF</p><p className="drawer-message">{selected.message}</p><label className="field"><span>Update status</span><select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)}>{statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></label></aside></div>}
  </section>;
}
