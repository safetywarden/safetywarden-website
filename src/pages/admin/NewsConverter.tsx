import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, Save, Info, ChevronDown, ChevronUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedAdminRoute from '../../components/admin/ProtectedAdminRoute';
import { supabase } from '../../lib/supabase';

interface NewsInput {
  title: string;
  snippet: string;
  publish_date: string;
  link: string;
}

interface IntelligenceOutput {
  title: string;
  slug: string;
  category: string;
  source_type: string;
  publish_date: string;
  short_summary: string;
  safetywarden_insight: string;
  inspection_guidance: string[];
  risk_tags: string[];
  geography: string;
  severity_level: string;
  source_link: string;
  seo_meta_title: string;
  seo_meta_description: string;
}

const CATEGORIES = [
  "Safety & Fire",
  "EHS & Occupational Safety",
  "ESG & Sustainability",
  "Pollution Control",
  "Climate & Environmental Risk"
];

const SOURCE_TYPES = [
  "Incident",
  "Regulation",
  "Enforcement",
  "Climate",
  "Insight"
];

const SEVERITY_LEVELS = ["Low", "Medium", "High"];

function NewsConverter() {
  const [newsInput, setNewsInput] = useState<NewsInput>({
    title: '',
    snippet: '',
    publish_date: '',
    link: ''
  });

  const [output, setOutput] = useState<IntelligenceOutput | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleConvert = () => {
    if (!newsInput.title || !newsInput.snippet) {
      alert('Please fill in at least title and snippet');
      return;
    }

    const slug = generateSlug(newsInput.title);

    const converted: IntelligenceOutput = {
      title: newsInput.title,
      slug,
      category: CATEGORIES[0],
      source_type: SOURCE_TYPES[0],
      publish_date: newsInput.publish_date || new Date().toISOString().split('T')[0],
      short_summary: newsInput.snippet.slice(0, 300),
      safetywarden_insight: `This ${SOURCE_TYPES[0].toLowerCase()} highlights critical considerations for facility managers and safety professionals. Organizations should review their current protocols and ensure compliance with applicable standards. Regular audits and proactive risk assessments can help identify potential gaps before they result in incidents or regulatory actions.`,
      inspection_guidance: [
        "Review current safety protocols and documentation",
        "Verify compliance with relevant regulatory requirements",
        "Inspect physical safety systems and equipment",
        "Check staff training records and competency levels",
        "Assess emergency response procedures and equipment",
        "Document findings and develop corrective action plans"
      ],
      risk_tags: [
        "Compliance",
        "Safety Management",
        "Risk Assessment",
        "Regulatory",
        "Audit",
        "Training"
      ],
      geography: "Global",
      severity_level: "Medium",
      source_link: newsInput.link,
      seo_meta_title: `${newsInput.title} | SafetyWarden Intelligence`,
      seo_meta_description: newsInput.snippet.slice(0, 155)
    };

    setOutput(converted);
    setSavedId(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (!output) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('intelligence_entries')
        .insert([{
          title: output.title,
          slug: output.slug,
          category: output.category,
          source_type: output.source_type,
          publish_date: output.publish_date,
          short_summary: output.short_summary,
          safetywarden_insight: output.safetywarden_insight,
          inspection_guidance: output.inspection_guidance,
          risk_tags: output.risk_tags,
          geography: output.geography,
          severity_level: output.severity_level,
          source_link: output.source_link,
          seo_meta_title: output.seo_meta_title,
          seo_meta_description: output.seo_meta_description,
          is_published: false
        }])
        .select('id')
        .single();

      if (error) throw error;

      setSavedId(data.id);
      alert('Intelligence entry saved successfully! You can now edit and publish it from the Intelligence Admin page.');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save entry: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleOutputChange = (field: keyof IntelligenceOutput, value: any) => {
    if (output) {
      setOutput({ ...output, [field]: value });
    }
  };

  const handleArrayChange = (field: 'inspection_guidance' | 'risk_tags', index: number, value: string) => {
    if (output) {
      const newArray = [...output[field]];
      newArray[index] = value;
      setOutput({ ...output, [field]: newArray });
    }
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Intelligence News Converter</h1>
        <p className="mt-2 text-gray-600">
          Transform safety news items into publish-ready Intelligence Hub entries
        </p>
      </div>

      {/* Instructions Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blue-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Editor Guidelines & Instructions</h3>
              <p className="text-sm text-blue-700">Role: SafetyWarden's Intelligence Editor</p>
            </div>
          </div>
          {showInstructions ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {showInstructions && (
          <div className="px-6 py-4 border-t border-blue-200 bg-white space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Task</h4>
              <p className="text-sm text-gray-700">
                Convert RSS news items into publish-ready SafetyWarden Intelligence Hub posts focused on audits, inspections, and compliance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Rules</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Use only the information provided from the RSS item</li>
                <li>Do not invent facts</li>
                <li>Paraphrase; do not copy article text verbatim</li>
                <li>Be practical and inspection-oriented</li>
                <li>Output valid JSON only</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Categories</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {CATEGORIES.map(cat => (
                    <li key={cat}>• {cat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Source Types</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {SOURCE_TYPES.map(type => (
                    <li key={type}>• {type}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Severity Levels</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {SEVERITY_LEVELS.map(level => (
                    <li key={level}>• {level}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Content Requirements</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Short Summary:</strong> 60-90 words explaining what happened, where, and why it matters for safety or compliance.
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>SafetyWarden Insight:</strong> 150-200 words explaining implications for site owners, contractors, EHS heads, and inspection readiness.
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Inspection Guidance:</strong> 6 specific auditor checks related to the incident/regulation.
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Risk Tags:</strong> 6 relevant tags for categorization and searchability.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">News Input</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title * <span className="text-gray-500 font-normal">(rss.title)</span>
              </label>
              <input
                type="text"
                value={newsInput.title}
                onChange={(e) => setNewsInput({ ...newsInput, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Factory Fire in Mumbai Kills 12 Workers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Snippet * <span className="text-gray-500 font-normal">(rss.description)</span>
              </label>
              <textarea
                value={newsInput.snippet}
                onChange={(e) => setNewsInput({ ...newsInput, snippet: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the news description or summary from RSS feed..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date <span className="text-gray-500 font-normal">(rss.pubDate)</span>
              </label>
              <input
                type="date"
                value={newsInput.publish_date}
                onChange={(e) => setNewsInput({ ...newsInput, publish_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Link <span className="text-gray-500 font-normal">(rss.link)</span>
              </label>
              <input
                type="url"
                value={newsInput.link}
                onChange={(e) => setNewsInput({ ...newsInput, link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/news-article"
              />
            </div>

            <button
              onClick={handleConvert}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Sparkles className="w-5 h-5" />
              Generate Intelligence Entry
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Intelligence Output</h2>
            </div>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !!savedId}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4" />
                  {savedId ? 'Saved' : saving ? 'Saving...' : 'Save to DB'}
                </button>
              </div>
            )}
          </div>

          {!output ? (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Fill in the news input and click "Generate Intelligence Entry"</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={output.title}
                  onChange={(e) => handleOutputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={output.slug}
                  onChange={(e) => handleOutputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={output.category}
                    onChange={(e) => handleOutputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                  <select
                    value={output.source_type}
                    onChange={(e) => handleOutputChange('source_type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {SOURCE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Geography</label>
                  <input
                    type="text"
                    value={output.geography}
                    onChange={(e) => handleOutputChange('geography', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={output.severity_level}
                    onChange={(e) => handleOutputChange('severity_level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {SEVERITY_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Summary <span className="text-xs text-gray-500">(60-90 words)</span>
                </label>
                <textarea
                  value={output.short_summary}
                  onChange={(e) => handleOutputChange('short_summary', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Explain what happened, where, and why it matters for safety or compliance..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {output.short_summary.split(' ').filter(w => w.length > 0).length}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SafetyWarden Insight <span className="text-xs text-gray-500">(150-200 words)</span>
                </label>
                <textarea
                  value={output.safetywarden_insight}
                  onChange={(e) => handleOutputChange('safetywarden_insight', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Explain implications for site owners, contractors, EHS heads, and inspection readiness..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {output.safetywarden_insight.split(' ').filter(w => w.length > 0).length}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspection Guidance <span className="text-xs text-gray-500">(6 auditor checks)</span>
                </label>
                {output.inspection_guidance.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('inspection_guidance', index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                    placeholder={`Auditor check ${index + 1}: e.g., Verify fire extinguisher locations...`}
                  />
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Tags <span className="text-xs text-gray-500">(6 tags)</span>
                </label>
                {output.risk_tags.map((tag, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayChange('risk_tags', index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                    placeholder={`Tag ${index + 1}: e.g., Fire Safety, Compliance...`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {output && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">JSON Output</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            {JSON.stringify(output, null, 2)}
          </pre>
        </div>
      )}
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

export default NewsConverter;
