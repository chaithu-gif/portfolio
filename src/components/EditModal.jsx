import { useState, useEffect } from "react";
import { FiX, FiSave, FiTrash2, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

const fieldTypes = {
  text: { label: "Text", component: TextField },
  textarea: { label: "Multi-line", component: TextareaField },
  number: { label: "Number", component: NumberField },
  list: { label: "Tags (comma-separated)", component: ListField },
  url: { label: "URL", component: TextField },
};

function TextField({ value, onChange, placeholder }) {
  return (
    <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
  );
}

function TextareaField({ value, onChange, placeholder }) {
  return (
    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={3}
      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
  );
}

function NumberField({ value, onChange, placeholder }) {
  return (
    <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      placeholder={placeholder} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
  );
}

function ListField({ value, onChange, placeholder }) {
  const str = Array.isArray(value) ? value.join(", ") : value || "";
  return (
    <input type="text" value={str} onChange={(e) => onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
      placeholder={placeholder} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
  );
}

const sectionConfigs = {
  hero: {
    title: "Hero Section",
    fields: [
      { key: "name", label: "Your Name" },
      { key: "tagline", label: "Tagline" },
      { key: "subtitle", label: "Subtitle" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "resumeUrl", label: "Resume URL", type: "text" },
    ],
    subItems: {
      key: "highlights",
      label: "Highlight Stats",
      addTemplate: { label: "New Stat", value: 1, suffix: "+" },
      fields: [
        { key: "label", label: "Label" },
        { key: "value", label: "Value", type: "number" },
        { key: "suffix", label: "Suffix" },
      ],
    },
  },
  about: {
    title: "About Section",
    
    subItems: {
      key: "highlights",
      label: "Highlights",
      addTemplate: { title: "New", desc: "Description" },
      fields: [
        { key: "title", label: "Title" },
        { key: "desc", label: "Description", type: "textarea" },
      ],
    },
    subItems2: {
      key: "timeline",
      label: "Timeline Entries",
      addTemplate: { year: "2027", title: "New Entry", desc: "Description" },
      fields: [
        { key: "year", label: "Year" },
        { key: "title", label: "Title" },
        { key: "desc", label: "Description", type: "textarea" },
      ],
    },
  
  subItems3: {
  key: "education",
  label: "Education",
  addTemplate: {
    degree: "New Degree",
    university: "University Name",
    year: "2026",
    cgpa: ""
  },
  fields: [
    { key: "degree", label: "Degree" },
    { key: "university", label: "University" },
    { key: "year", label: "Years" },
    { key: "cgpa", label: "CGPA / Percentage" }
  ]
}
  },
  skills: {
    title: "Skills",
    isArray: true,
    fields: [
      { key: "title", label: "Category Name" },
    ],
    subItems: {
      key: "skills",
      label: "Skills in this category",
      addTemplate: { name: "New Skill", level: 70 },
      fields: [
        { key: "name", label: "Skill Name" },
        { key: "level", label: "Proficiency (0-100)", type: "number" },
      ],
    },
  },
  projects: {
    title: "Projects",
    isArray: true,
    fields: [
      { key: "title", label: "Project Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Technologies", type: "list" },
      { key: "github", label: "GitHub URL", type: "url" },
      { key: "live", label: "Live Demo URL", type: "url" },
      { key: "category", label: "Category" },
      { key: "challenges", label: "Challenges", type: "textarea" },
      { key: "outcome", label: "Outcome", type: "textarea" },
    ],
  },
  experience: {
    title: "Experience & Certifications",
    subItems: {
      key: "certifications",
      label: "Certifications",
      addTemplate: { title: "New Certification", issuer: "Issuer" },
      fields: [
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
      ],
    },
    subItems2: {
      key: "activities",
      label: "Hackathons & Events",
      addTemplate: { title: "New Event", desc: "Description", tag: "Participant" },
      fields: [
        { key: "title", label: "Title" },
        { key: "desc", label: "Description", type: "textarea" },
        { key: "tag", label: "Tag" },
      ],
    },
  },
  coding: {
    title: "Coding Profiles",
    isArray: true,
    fields: [
      { key: "name", label: "Platform Name" },
      { key: "handle", label: "Username" },
      { key: "solved", label: "Problems Solved" },
      { key: "link", label: "Profile URL", type: "url" },
    ],
  },
  resume: {
    title: "Resume Stats",
    subItems: {
      key: "stats",
      label: "Statistics",
      addTemplate: { label: "New Stat", value: 1, suffix: "+" },
      fields: [
        { key: "label", label: "Label" },
        { key: "value", label: "Value", type: "number" },
        { key: "suffix", label: "Suffix" },
      ],
    },
  },
  contact: {
    title: "Contact & Social",
    sections: [
      {
        label: "Contact Details",
        fields: [
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "location", label: "Location" },
        ],
      },
    ],
    subItems: {
      key: "social",
      label: "Social Links",
      addTemplate: { platform: "New", url: "https://", handle: "@username" },
      fields: [
        { key: "platform", label: "Platform" },
        { key: "url", label: "URL", type: "url" },
        { key: "handle", label: "Handle" },
      ],
    },
  },
};

function getNestedValue(obj, path) {
  return path.split(".").reduce((o, k) => (o || {})[k], obj);
}

function setNestedValue(obj, path, val) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, k) => { if (!(k in o)) o[k] = {}; return o[k]; }, obj);
  target[last] = val;
}

function SubItemEditor({ items, onChange, config, itemLabel }) {
  const [expanded, setExpanded] = useState({});

  const addItem = () => {
    if (!config.addTemplate) return;
    onChange([...items, { ...config.addTemplate }]);
  };

  const updateItem = (i, field, val) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  const deleteItem = (i) => {
    if (!confirm(`Delete this ${itemLabel || "item"}?`)) return;
    onChange(items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="border-t border-slate-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-700">{config.label}</span>
        <button onClick={addItem} className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-bg text-white text-xs font-medium hover:shadow-lg hover:shadow-primary/20 transition-all">
          <FiPlus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button onClick={() => setExpanded((p) => ({ ...p, [i]: !p[i] }))}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-all">
              <span className="font-medium text-slate-700 truncate">
                {item.title ||
item.degree ||
item.name ||
item.platform ||
`Item ${i + 1}`}
              </span>
              {expanded[i] ? <FiChevronUp size={14} className="text-slate-400" /> : <FiChevronDown size={14} className="text-slate-400" />}
            </button>
            {expanded[i] && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                {config.fields.map((f) => {
                  const FieldComp = fieldTypes[f.type]?.component || TextField;
                  return (
                    <div key={f.key}>
                      <label className="text-xs font-medium text-slate-500 block mb-1">{f.label}</label>
                      <FieldComp value={item[f.key]} onChange={(v) => updateItem(i, f.key, v)} placeholder={f.label} />
                    </div>
                  );
                })}
                <button onClick={() => deleteItem(i)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-all">
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, index, fields, subItemsConfig,onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [expanded, setExpanded] = useState(false);
const display =
  item.title ||
  item.degree ||
  item.name ||
  item.platform ||
  `Item ${index + 1}`;
  return (
  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
    <div className="flex items-center gap-2 px-4 py-2.5">
      <button
        onClick={() => onMoveUp?.(index)}
        disabled={isFirst}
        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30"
      >
        <FiChevronUp size={14} />
      </button>

      <button
        onClick={() => onMoveDown?.(index)}
        disabled={isLast}
        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30"
      >
        <FiChevronDown size={14} />
      </button>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex-1 text-sm font-medium text-slate-700 text-left truncate"
      >
        {display}
      </button>

      <button
        onClick={() => onDelete(index)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
      >
        <FiTrash2 size={14} />
      </button>
    </div>

    {expanded && (
      <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
        {fields.map((f) => {
          const FieldComp = fieldTypes[f.type]?.component || TextField;

          return (
            <div key={f.key}>
              <label className="text-xs font-medium text-slate-500 block mb-1">
                {f.label}
              </label>

              <FieldComp
                value={item[f.key]}
                onChange={(v) => onUpdate(index, f.key, v)}
                placeholder={f.label}
              />
            </div>
          );
        })}

        {subItemsConfig && (
          <SubItemEditor
            items={item[subItemsConfig.key] || []}
            onChange={(updatedSkills) =>
              onUpdate(index, subItemsConfig.key, updatedSkills)
            }
            config={subItemsConfig}
            itemLabel="Skill"
          />
        )}
      </div>
    )}
  </div>
);
}

export default function EditModal({ section, open, onClose }) {
  const { data, updateData, admin } = useApp();
  const config = sectionConfigs[section];
  const [form, setForm] = useState({});
  const [localItems, setLocalItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    if (!open || !config || !admin) return;
    const sectionData = data[section];
    if (config.isArray) {
      setLocalItems([...(sectionData || [])]);
      setForm({});
    } else if (config.sections) {
      setForm(JSON.parse(JSON.stringify(sectionData || {})));
      if (config.subItems) setLocalItems([...(sectionData?.[config.subItems.key] || [])]);
      if (config.subItems2) setLocalItems2([...(sectionData?.[config.subItems2.key] || [])]);
      if (config.subItems3) {
  setLocalItems3([
    ...(sectionData?.[config.subItems3.key] || [])
  ]);
}
    } else {
      setForm(JSON.parse(JSON.stringify(sectionData || {})));
      if (config.subItems) setLocalItems([...(sectionData?.[config.subItems.key] || [])]);
    }
    setMsg("");
  }, [open, section, admin]);

  const [localItems2, setLocalItems2] = useState([]);
  const [localItems3, setLocalItems3] = useState([]);

  const showMsg = (text, type) => { setMsg(text); setMsgType(type); setTimeout(() => setMsg(""), 3000); };

  const handleFieldChange = (key, val) => {
    if (key.includes(".")) {
      setForm((prev) => { const n = { ...prev }; setNestedValue(n, key, val); return n; });
    } else {
      setForm((prev) => ({ ...prev, [key]: val }));
    }
  };

  const handleArrayUpdate = (index, field, val) => {
    setLocalItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleArrayDelete = (index) => {
    if (!confirm(`Delete this item?`)) return;
    setLocalItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleArrayMove = (index, dir) => {
    const to = index + dir;
    if (to < 0 || to >= localItems.length) return;
    setLocalItems((prev) => {
      const next = [...prev];
      [next[index], next[to]] = [next[to], next[index]];
      return next;
    });
  };

  const handleAddArray = () => {
    if (!config.subItems?.addTemplate) return;
    setLocalItems((prev) => [...prev, { ...config.subItems.addTemplate }]);
  };

  const handleSave = () => {
    if (!admin) return;
    setSaving(true);
    try {
      if (config.isArray) {
        updateData(section, localItems);
      } else {
        let payload = { ...form };
        if (config.subItems) payload[config.subItems.key] = localItems;
        if (config.subItems2) payload[config.subItems2.key] = localItems2;
        if (config.subItems3) payload[config.subItems3.key] = localItems3;
        updateData(section, payload);
      }
      showMsg("Saved successfully!", "success");
    } catch (e) {
      showMsg("Failed to save: " + e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (!open || !config) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[5vh] sm:pt-[10vh]" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200" style={{ scrollbarWidth: "thin" }}>
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 rounded-t-2xl">
            <h2 className="text-lg font-semibold text-slate-900">Edit {config.title}</h2>
            <div className="flex items-center gap-2">
              {msg && (
                <span className={`text-xs px-3 py-1 rounded-lg ${msgType === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                  {msg}
                </span>
              )}
              <button onClick={onClose} type="button" aria-label="Close edit panel" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Sections (grouped fields) */}
            {config.sections?.map((sec) => (
              <div key={sec.label} className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{sec.label}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sec.fields.map((f) => {
                    const FieldComp = fieldTypes[f.type]?.component || TextField;
                    const val = f.key.includes(".") ? getNestedValue(form, f.key) : form[f.key];
                    return (
                      <div key={f.key}>
                        <label className="text-xs font-medium text-slate-500 block mb-1">{f.label}</label>
                        <FieldComp value={val} onChange={(v) => handleFieldChange(f.key, v)} placeholder={f.label} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Flat fields */}
            {config.fields && !config.isArray && (
              <div className="grid sm:grid-cols-2 gap-3">
                {config.fields.map((f) => {
                  const FieldComp = fieldTypes[f.type]?.component || TextField;
                  return (
                    <div key={f.key}>
                      <label className="text-xs font-medium text-slate-500 block mb-1">{f.label}</label>
                      <FieldComp value={form[f.key]} onChange={(v) => handleFieldChange(f.key, v)} placeholder={f.label} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Array items (projects, skills categories, coding profiles) */}
            {config.isArray && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Items</span>
                  <button onClick={() =>
  setLocalItems((prev) => [
    ...prev,
    {
      title: "New Category",
      skills: [],
    },
  ])
}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-bg text-white text-xs font-medium">
                    <FiPlus size={12} /> Add
                  </button>
                </div>
                {localItems.map((item, i) => (
                  <ItemCard
  key={i}
  item={item}
  index={i}
  fields={config.fields}
  subItemsConfig={config.subItems}
  onUpdate={(idx, field, val) => handleArrayUpdate(idx, field, val)}
  onDelete={handleArrayDelete}
  onMoveUp={(idx) => handleArrayMove(idx, -1)}
  onMoveDown={(idx) => handleArrayMove(idx, 1)}
  isFirst={i === 0}
  isLast={i === localItems.length - 1}
/>
                ))}
              </div>
            )}

            {/* Sub-items (highlights, timeline, skills within category, certs, activities, stats, social) */}
            {config.subItems && !config.isArray && (
  <SubItemEditor
    items={localItems}
    onChange={setLocalItems}
    config={config.subItems}
    itemLabel={config.subItems.label}
  />
)}
            {config.subItems2 && (
              <SubItemEditor items={localItems2} onChange={setLocalItems2} config={config.subItems2} itemLabel={config.subItems2.label} />
            )}
            {config.subItems3 && (
  <SubItemEditor
    items={localItems3}
    onChange={setLocalItems3}
    config={config.subItems3}
    itemLabel="Education"
  />
)}
          </div>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 bg-white border-t border-slate-200 rounded-b-2xl">
            <button onClick={onClose} className="btn-outline text-sm">Cancel</button>
            <button onClick={handleSave} disabled={saving || !admin}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <FiSave size={16} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
