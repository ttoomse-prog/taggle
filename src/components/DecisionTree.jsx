import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import './DecisionTree.css'

export default function DecisionTree() {
  const [path, setPath] = useState([])
  const [currentNodeId, setCurrentNodeId] = useState('start')

  const decisionTree = {
    start: {
      question: "What are you tagging?",
      context: "This decision tree guides you through the iXBRL tagging process for financial statements. Choose the type of content you're working with.",
      options: [
        { label: "Quantifiable financial fact (amounts, ratios, counts)", nextId: "quantType", icon: "💰" },
        { label: "Narrative text or disclosure", nextId: "narrative", icon: "📄" }
      ]
    },

    quantType: {
      question: "What type of value?",
      context: "The value type determines how you'll tag and format the numeric content.",
      options: [
        { label: "Monetary amount (£, $, etc.)", nextId: "monetary", icon: "💷" },
        { label: "Percentage or ratio (5%, 0.25)", nextId: "percentage", icon: "📊" },
        { label: "Count or units (employees, items)", nextId: "count", icon: "🔢" }
      ]
    },

    monetary: {
      question: "Instant or duration?",
      context: "Balance sheet items are measured at a point in time (instant). P&L items cover a period (duration).",
      tip: "Balance sheet items (assets, liabilities, equity) → Instant. Income statement items (revenue, expenses) → Duration.",
      options: [
        { label: "Instant (balance sheet item, fixed date)", nextId: "instant", icon: "📅" },
        { label: "Duration (P&L, covers a period)", nextId: "duration", icon: "📆" }
      ]
    },

    percentage: {
      question: "How should this be represented?",
      context: "Percentages can be tagged as pure decimals (0.05 for 5%) or as percentages depending on taxonomy requirements.",
      options: [
        { label: "As decimal (0.05 for 5%)", nextId: "decimalContext", icon: "0️⃣" },
        { label: "As pure percentage value", nextId: "decimalContext", icon: "%" }
      ]
    },

    count: {
      question: "Does this count need time context?",
      context: "Most counts (employees, items) are static but some may be period-specific.",
      options: [
        { label: "At a specific date (snapshot)", nextId: "instant", icon: "📸" },
        { label: "Over a period", nextId: "duration", icon: "⏱️" },
        { label: "No time dimension needed", nextId: "noTime", icon: "∞" }
      ]
    },

    instant: {
      question: "Is there a footnote or continuation?",
      context: "You may need to link this tagged value to footnotes or handle multi-block text.",
      options: [
        { label: "Yes, link to footnote", nextId: "footnote", icon: "🔗" },
        { label: "Continuation block (text spans multiple areas)", nextId: "continuation", icon: "↔️" },
        { label: "No, straightforward tag", nextId: "taxonomy", icon: "✓" }
      ]
    },

    duration: {
      question: "Is there a footnote or continuation?",
      context: "Linking notes helps users understand the tagged values in context.",
      options: [
        { label: "Yes, link to footnote", nextId: "footnote", icon: "🔗" },
        { label: "Continuation block", nextId: "continuation", icon: "↔️" },
        { label: "No, straightforward tag", nextId: "taxonomy", icon: "✓" }
      ]
    },

    noTime: {
      question: "Does this need footnote linking?",
      context: "Even time-independent values may reference explanatory notes.",
      options: [
        { label: "Yes, link to footnote", nextId: "footnote", icon: "🔗" },
        { label: "No, standalone tag", nextId: "taxonomy", icon: "✓" }
      ]
    },

    decimalContext: {
      question: "Does this need footnote linking?",
      context: "Ratios and percentages often require context from footnotes.",
      options: [
        { label: "Yes, link to footnote", nextId: "footnote", icon: "🔗" },
        { label: "No, standalone tag", nextId: "scenario", icon: "✓" }
      ]
    },

    footnote: {
      question: "Does this value need scenario tagging?",
      context: "Scenarios distinguish revised figures, guidance, or alternative assumptions from standard reported figures.",
      tip: "Scenarios: standard (default), revised, guidance, pro forma, etc.",
      options: [
        { label: "Yes, specify scenario (revised, guidance, etc.)", nextId: "scenario", icon: "🎯" },
        { label: "No, standard scenario", nextId: "segment", icon: "📌" }
      ]
    },

    continuation: {
      question: "Does this value need scenario tagging?",
      context: "You've marked this as a continuation block. Now determine if a scenario attribute applies.",
      options: [
        { label: "Yes, specify scenario", nextId: "scenario", icon: "🎯" },
        { label: "No, standard scenario", nextId: "segment", icon: "📌" }
      ]
    },

    taxonomy: {
      question: "Scenario or business segment?",
      context: "Determine if this fact needs a scenario (revised, guidance) or segment/dimension (business line, geography).",
      options: [
        { label: "Scenario required (revised, guidance, etc.)", nextId: "scenario", icon: "🎯" },
        { label: "Business segment/dimension needed", nextId: "segment", icon: "🗺️" },
        { label: "Neither—standard reporting", nextId: "summary", icon: "✓" }
      ]
    },

    scenario: {
      question: "Apply segment or dimension tagging?",
      context: "Segments distinguish between business units, geographies, or other classifications.",
      tip: "Common dimensions: business segment, reporting period, geography, consolidation status.",
      options: [
        { label: "Yes, apply segment/dimension context", nextId: "segment", icon: "🗺️" },
        { label: "No, core fact only", nextId: "summary", icon: "✓" }
      ]
    },

    segment: {
      question: "Quality check before tagging",
      context: "Review your selections to ensure accuracy before finalizing the tag.",
      options: [
        { label: "Review my selections", nextId: "summary", icon: "✔️" }
      ]
    },

    narrative: {
      question: "Is this a required disclosure?",
      context: "Required disclosures (like going concern, accounting policies) have standard taxonomy text block concepts.",
      options: [
        { label: "Yes, standard required disclosure", nextId: "textblock", icon: "📋" },
        { label: "No, optional or embedded detail", nextId: "narrativeDetail", icon: "📝" }
      ]
    },

    textblock: {
      question: "Does this span multiple blocks?",
      context: "Some disclosures break across page boundaries and need continuation marking.",
      options: [
        { label: "Yes, mark continuation blocks", nextId: "narrativeContinuation", icon: "↔️" },
        { label: "No, single coherent block", nextId: "narrativeSummary", icon: "✓" }
      ]
    },

    narrativeDetail: {
      question: "Should you tag key data points within the narrative?",
      context: "You may extract and tag specific figures embedded in narrative text.",
      options: [
        { label: "Yes, extract and tag key figures", nextId: "instant", icon: "🎯" },
        { label: "No, narrative-only tagging", nextId: "narrativeSummary", icon: "📄" }
      ]
    },

    narrativeContinuation: {
      question: "All set for narrative tagging",
      context: "Your narrative disclosure is ready for iXBRL tagging with continuation blocks marked.",
      options: [
        { label: "Confirm and finish", nextId: "narrativeSummary", icon: "✓" }
      ]
    },

    summary: {
      question: "✓ Tagging Decision Complete",
      context: "Review your tagging strategy below.",
      isSummary: true,
      options: [
        { label: "Start over", nextId: "start", icon: "🔄" }
      ]
    },

    narrativeSummary: {
      question: "✓ Narrative Tagging Complete",
      context: "Your narrative content is ready for tagging.",
      isSummary: true,
      options: [
        { label: "Start over", nextId: "start", icon: "🔄" }
      ]
    }
  }

  const node = decisionTree[currentNodeId]

  const handleOption = (nextId) => {
    const nodeLabel = node.question
    setPath([...path, { id: currentNodeId, label: nodeLabel }])
    setCurrentNodeId(nextId)
  }

  const handleBack = () => {
    if (path.length > 0) {
      const newPath = [...path]
      const previous = newPath.pop()
      setPath(newPath)
      setCurrentNodeId(previous.id)
    }
  }

  const getSummary = () => {
    let summary = []
    
    if (path.some(p => p.id === 'quantType')) {
      summary.push({ category: 'Content Type', value: 'Quantifiable Fact' })
    } else if (path.some(p => p.id === 'narrative')) {
      summary.push({ category: 'Content Type', value: 'Narrative Text' })
    }

    if (path.some(p => p.id === 'monetary')) {
      summary.push({ category: 'Value Type', value: 'Monetary Amount' })
    } else if (path.some(p => p.id === 'percentage')) {
      summary.push({ category: 'Value Type', value: 'Percentage/Ratio' })
    } else if (path.some(p => p.id === 'count')) {
      summary.push({ category: 'Value Type', value: 'Count/Units' })
    }

    if (path.some(p => p.id === 'instant')) {
      summary.push({ category: 'Temporal Context', value: 'Instant (Point in Time)' })
    } else if (path.some(p => p.id === 'duration')) {
      summary.push({ category: 'Temporal Context', value: 'Duration (Period)' })
    } else if (path.some(p => p.id === 'noTime')) {
      summary.push({ category: 'Temporal Context', value: 'No Time Dimension' })
    }

    if (path.some(p => p.id === 'footnote')) {
      summary.push({ category: 'Footnote Link', value: 'Yes - include footnoteRef' })
    }

    if (path.some(p => p.id === 'continuation')) {
      summary.push({ category: 'Continuation Block', value: 'Apply continuedAt attribute' })
    }

    if (path.some(p => p.id === 'scenario')) {
      summary.push({ category: 'Scenario Tagging', value: 'Required - specify (revised, guidance, etc.)' })
    }

    if (path.some(p => p.id === 'segment')) {
      summary.push({ category: 'Segmentation', value: 'Apply dimension context' })
    }

    if (path.some(p => p.id === 'textblock')) {
      summary.push({ category: 'Disclosure Type', value: 'Required Text Block' })
    }

    return summary.length > 0 ? summary : null
  }

  const summary = getSummary()

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1>iXBRL Tagging Guide</h1>
          <div className="accent-bar" />
          <p>Interactive decision tree for financial statement tagging</p>
        </div>

        {/* Progress indicator */}
        <div className="progress-container">
          {path.map((p, idx) => (
            <div key={idx} className="progress-item">
              {idx + 1}. {p.label}
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="card">
          {/* Question */}
          <h2 className="question">{node.question}</h2>

          {/* Context */}
          <p className="context">{node.context}</p>

          {/* Tip if present */}
          {node.tip && (
            <div className="tip">
              💡 <strong>Tip:</strong> {node.tip}
            </div>
          )}

          {/* Summary if this is summary view */}
          {node.isSummary && summary && (
            <div className="summary">
              <h3>Your Tagging Strategy</h3>
              {summary.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <div className="summary-category">{item.category}</div>
                  <div className="summary-value">{item.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          <div className="options-container">
            {node.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOption(option.nextId)}
                className="option-button"
              >
                <span>{option.icon} {option.label}</span>
                <ChevronRight size={20} style={{ opacity: 0.6 }} />
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="navigation">
            {path.length > 0 && (
              <button onClick={handleBack} className="nav-button">
                <ChevronLeft size={18} /> Back
              </button>
            )}
            {currentNodeId !== 'start' && (
              <button
                onClick={() => {
                  setPath([])
                  setCurrentNodeId('start')
                }}
                className="nav-button nav-button-reset"
              >
                <RotateCcw size={18} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>iXBRL Tagging Decision Tree • FRC Digital Reporting</p>
        </div>
      </div>
    </div>
  )
}
