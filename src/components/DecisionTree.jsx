import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw, BookOpen, Zap } from 'lucide-react'
import './DecisionTree.css'

export default function DecisionTree() {
  const [mode, setMode] = useState(null) // null, 'guide', or 'practice'
  const [path, setPath] = useState([])
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // UK Companies House Taxonomy Concepts
  const companiesHouseConcepts = [
    { code: 'Assets', label: 'Total Assets', category: 'Balance Sheet' },
    { code: 'CurrentAssets', label: 'Current Assets', category: 'Balance Sheet' },
    { code: 'Cash', label: 'Cash and Cash Equivalents', category: 'Current Assets' },
    { code: 'TradeReceivables', label: 'Trade Receivables', category: 'Current Assets' },
    { code: 'Inventory', label: 'Inventories', category: 'Current Assets' },
    { code: 'PPE', label: 'Property, Plant and Equipment', category: 'Non-Current Assets' },
    { code: 'Intangibles', label: 'Intangible Assets', category: 'Non-Current Assets' },
    { code: 'Liabilities', label: 'Total Liabilities', category: 'Balance Sheet' },
    { code: 'CurrentLiabilities', label: 'Current Liabilities', category: 'Liabilities' },
    { code: 'TradePayables', label: 'Trade Payables', category: 'Current Liabilities' },
    { code: 'Borrowings', label: 'Borrowings (Current)', category: 'Current Liabilities' },
    { code: 'LongTermBorrowings', label: 'Borrowings (Non-Current)', category: 'Liabilities' },
    { code: 'Equity', label: 'Total Equity', category: 'Balance Sheet' },
    { code: 'ShareCapital', label: 'Share Capital', category: 'Equity' },
    { code: 'RetainedEarnings', label: 'Retained Earnings', category: 'Equity' },
    { code: 'Revenue', label: 'Revenue', category: 'Income Statement' },
    { code: 'CostOfSales', label: 'Cost of Sales', category: 'Income Statement' },
    { code: 'GrossProfit', label: 'Gross Profit', category: 'Income Statement' },
    { code: 'AdminExpense', label: 'Administrative Expenses', category: 'Income Statement' },
    { code: 'OperatingProfit', label: 'Operating Profit', category: 'Income Statement' },
    { code: 'FinanceCosts', label: 'Finance Costs', category: 'Income Statement' },
    { code: 'ProfitBeforeTax', label: 'Profit Before Tax', category: 'Income Statement' },
    { code: 'TaxExpense', label: 'Tax Expense', category: 'Income Statement' },
    { code: 'ProfitForYear', label: 'Profit for the Year', category: 'Income Statement' },
    { code: 'EPS', label: 'Earnings Per Share', category: 'Income Statement' }
  ]

  // Practice examples with correct answers and explanations
  // FRC Rules reference
  const frcRules = {
    quantType: {
      rule: "RULE 4.3 & 4.4",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "All business data items in a report MUST be tagged with an appropriate XBRL tag IF a suitable tag exists. Choose tags matching the closest available meaning based on the tag's label, position, accounting reference, and period type.",
      section: "Section 4: Principles of XBRL Tagging"
    },
    monetary: {
      rule: "RULE 4.10",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Data items SHOULD be matched against tags of the correct period type. Monetary items representing income/expenses are flows (duration). Assets/liabilities are stocks (instant).",
      section: "Section 4.10: Period Type"
    },
    instant: {
      rule: "RULE 5.5.1",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Period contexts MUST be consistent with both the period covered by the report and the data concerned. Instant tags (balance sheet) use a single date context (end of period).",
      section: "Section 5.5: Period Context"
    },
    duration: {
      rule: "RULE 5.5.1",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Duration tags (P&L) use a date range context representing the full reporting period. Example: 1 Apr 2024 to 31 Mar 2025.",
      section: "Section 5.5: Period Context"
    },
    footnote: {
      rule: "RULE 4.5 & 4.19",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Significant numeric data MUST be tagged with appropriate numeric tags. Footnotes MAY be attached using XBRL footnote mechanism. Numeric data MUST NOT be hidden within a footnote.",
      section: "Section 4.5 & 4.19: Numeric Data & Footnotes"
    },
    scenario: {
      rule: "RULE 4.26",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Revised data uses dimension tags 'Superseded' for original values and 'Currently stated [default]' for revised data. Use 'Superseded' for amendments, not for supplementary notes.",
      section: "Section 4.26: Revised Data"
    },
    segment: {
      rule: "RULE 3.6 & 4.14",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Dimensions represent different forms in which data may be reported (e.g., segments, continuing operations). Non-standard dimension tags MUST only be used when no explicit tag is available.",
      section: "Section 3.6: Dimensions"
    },
    narrative: {
      rule: "RULE 4.3 & 4.17",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Narrative data should only be tagged if specific tags exist. Text tags MUST be applied to the full content of textual data they represent, not just portions.",
      section: "Section 4.3 & 4.17: Scope & Text Tagging"
    },
    textblock: {
      rule: "RULE 3.13 & 4.17",
      citation: "FRC XBRL Tagging Guide 2026",
      text: "Tags for textual information include name tags, description tags, and statement tags. Latest Inline XBRL allows different text fragments to be concatenated under a single tag.",
      section: "Section 3.13: Text Tags"
    }
  }

  const [showRules, setShowRules] = useState(null)

  const practiceExamples = [
    {
      scenario: "Your company has £2,500,000 in the bank and short-term investments.",
      fact: "£2,500,000",
      context: "Balance sheet item measured at 31 December 2024",
      correctAnswer: 'Cash',
      explanation: "This is Cash and Cash Equivalents. It's a current asset representing immediately available funds. This is an instant (point-in-time) fact measured at balance sheet date."
    },
    {
      scenario: "During the financial year, the company sold products worth £15,200,000.",
      fact: "£15,200,000",
      context: "For the year ended 31 December 2024",
      correctAnswer: 'Revenue',
      explanation: "This is Revenue. Income statement items covering a period (duration) measure activity over the full financial year, not at a point in time."
    },
    {
      scenario: "At year end, the company owes suppliers £890,000 that must be paid within 30 days.",
      fact: "£890,000",
      context: "Balance sheet item measured at 31 December 2024",
      correctAnswer: 'TradePayables',
      explanation: "This is Trade Payables (current liability). It's due within 12 months, making it a current liability. Measured at a specific date (instant)."
    },
    {
      scenario: "The company owns manufacturing equipment purchased for £3,500,000.",
      fact: "£3,500,000",
      context: "Balance sheet item measured at 31 December 2024",
      correctAnswer: 'PPE',
      explanation: "This is Property, Plant and Equipment. It's a non-current asset held for long-term use in operations. Measured at balance sheet date (instant)."
    },
    {
      scenario: "Operating expenses (salaries, rent, utilities) totaled £4,100,000 for the year.",
      fact: "£4,100,000",
      context: "For the year ended 31 December 2024",
      correctAnswer: 'AdminExpense',
      explanation: "This is Administrative Expenses. It's an income statement item covering the full reporting period (duration), not a snapshot at a specific date."
    },
    {
      scenario: "Customers owe the company £1,250,000 for products delivered but not yet paid.",
      fact: "£1,250,000",
      context: "Balance sheet item measured at 31 December 2024",
      correctAnswer: 'TradeReceivables',
      explanation: "This is Trade Receivables (current asset). These are amounts due from customers within one year. It's a point-in-time balance sheet measurement."
    },
    {
      scenario: "The company's bank loan balance at year end is £5,000,000, due in 2026.",
      fact: "£5,000,000",
      context: "Balance sheet item measured at 31 December 2024",
      correctAnswer: 'LongTermBorrowings',
      explanation: "This is Long-term Borrowings (non-current liability). Because it's due beyond 12 months, it's non-current. Measured at balance sheet date."
    },
    {
      scenario: "The company sold goods at cost of £8,900,000 during the year.",
      fact: "£8,900,000",
      context: "For the year ended 31 December 2024",
      correctAnswer: 'CostOfSales',
      explanation: "This is Cost of Sales. It's an income statement item representing the cost of inventory sold during the period (duration measurement)."
    }
  ]

  const currentPracticeExample = practiceExamples[practiceIndex]

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

  // Home Screen
  if (mode === null) {
    return (
      <div className="app-container">
        <div className="content-wrapper">
          <div className="header">
            <h1>Taggle</h1>
            <div className="accent-bar" />
            <p>iXBRL Tagging Training & Practice</p>
          </div>

          <div className="home-grid">
            <button 
              className="mode-card guide-card"
              onClick={() => {
                setMode('guide')
                setCurrentNodeId('start')
                setPath([])
              }}
            >
              <BookOpen size={48} />
              <h2>Decision Tree Guide</h2>
              <p>Learn the decision process for iXBRL tagging step by step</p>
              <div className="mode-arrow">
                <ChevronRight size={24} />
              </div>
            </button>

            <button 
              className="mode-card practice-card"
              onClick={() => {
                setMode('practice')
                setPracticeIndex(0)
                setSelectedConcept(null)
                setShowFeedback(false)
              }}
            >
              <Zap size={48} />
              <h2>Practice Mode</h2>
              <p>Test your knowledge by tagging real financial statement examples</p>
              <div className="mode-arrow">
                <ChevronRight size={24} />
              </div>
            </button>
          </div>

          <div className="footer">
            <p>UK Companies House iXBRL Tagging • FRC Digital Reporting</p>
          </div>
        </div>
      </div>
    )
  }

  // Practice Mode
  if (mode === 'practice') {
    const isCorrect = selectedConcept?.code === currentPracticeExample.correctAnswer
    
    return (
      <div className="app-container">
        <div className="content-wrapper">
          <div className="header">
            <h1>Practice Mode</h1>
            <div className="accent-bar" />
            <p>Example {practiceIndex + 1} of {practiceExamples.length}</p>
          </div>

          <div className="practice-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((practiceIndex + 1) / practiceExamples.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="card">
            <h2 className="question">Scenario</h2>
            <p className="scenario-text">{currentPracticeExample.scenario}</p>

            <div className="practice-details">
              <div className="detail-box">
                <h3>Fact to Tag</h3>
                <p className="fact-value">{currentPracticeExample.fact}</p>
              </div>
              <div className="detail-box">
                <h3>Context</h3>
                <p className="context-value">{currentPracticeExample.context}</p>
              </div>
            </div>

            <h3 className="select-label">Select the correct taxonomy concept:</h3>

            <div className="concept-selector">
              {companiesHouseConcepts.map((concept) => (
                <button
                  key={concept.code}
                  className={`concept-option ${selectedConcept?.code === concept.code ? 'selected' : ''} ${showFeedback && concept.code === currentPracticeExample.correctAnswer ? 'correct' : ''} ${showFeedback && selectedConcept?.code === concept.code && !isCorrect ? 'incorrect' : ''}`}
                  onClick={() => {
                    if (!showFeedback) {
                      setSelectedConcept(concept)
                    }
                  }}
                  disabled={showFeedback}
                >
                  <div className="concept-header">
                    <span className="concept-label">{concept.label}</span>
                    <span className="concept-category">{concept.category}</span>
                  </div>
                </button>
              ))}
            </div>

            {!showFeedback && selectedConcept && (
              <button 
                className="submit-button"
                onClick={() => setShowFeedback(true)}
              >
                Check Answer
              </button>
            )}

            {showFeedback && (
              <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                <h3>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h3>
                <p><strong>Correct Answer:</strong> {practiceExamples[practiceIndex].correctAnswer === selectedConcept?.code ? selectedConcept?.label : companiesHouseConcepts.find(c => c.code === currentPracticeExample.correctAnswer)?.label}</p>
                <p><strong>Explanation:</strong> {currentPracticeExample.explanation}</p>
              </div>
            )}

            <div className="practice-navigation">
              <button 
                className="nav-button"
                onClick={() => {
                  if (practiceIndex > 0) {
                    setPracticeIndex(practiceIndex - 1)
                    setSelectedConcept(null)
                    setShowFeedback(false)
                  }
                }}
                disabled={practiceIndex === 0}
              >
                <ChevronLeft size={18} /> Previous
              </button>

              <button 
                className="nav-button nav-button-home"
                onClick={() => {
                  setMode(null)
                  setPracticeIndex(0)
                  setSelectedConcept(null)
                  setShowFeedback(false)
                }}
              >
                Back to Home
              </button>

              <button 
                className="nav-button"
                onClick={() => {
                  if (practiceIndex < practiceExamples.length - 1) {
                    setPracticeIndex(practiceIndex + 1)
                    setSelectedConcept(null)
                    setShowFeedback(false)
                  }
                }}
                disabled={practiceIndex === practiceExamples.length - 1 || !showFeedback}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="footer">
            <p>Practice with UK Companies House Taxonomy</p>
          </div>
        </div>
      </div>
    )
  }

  // Guide Mode
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1>iXBRL Tagging Guide</h1>
          <div className="accent-bar" />
          <p>Interactive decision tree for financial statement tagging</p>
          <button 
            className="back-to-home-btn"
            onClick={() => {
              setMode(null)
              setPath([])
              setCurrentNodeId('start')
            }}
          >
            ← Back to Home
          </button>
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

          {/* FRC Rules Section */}
          {frcRules[currentNodeId] && (
            <div className="rules-section">
              <button 
                className="rules-toggle"
                onClick={() => setShowRules(showRules === currentNodeId ? null : currentNodeId)}
              >
                <span className="rules-icon">{showRules === currentNodeId ? '▼' : '▶'}</span>
                <span className="rules-label">📋 FRC Rule</span>
                <span className="rules-reference">{frcRules[currentNodeId].rule}</span>
              </button>
              {showRules === currentNodeId && (
                <div className="rules-content">
                  <div className="rules-header">
                    <strong>{frcRules[currentNodeId].rule}</strong>
                    <span className="rules-source">{frcRules[currentNodeId].citation}</span>
                  </div>
                  <p className="rules-text">{frcRules[currentNodeId].text}</p>
                  <div className="rules-reference-link">{frcRules[currentNodeId].section}</div>
                </div>
              )}
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
