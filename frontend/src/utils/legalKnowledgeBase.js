const legalKnowledgeBase = {
  divorce: {
    overview: "Divorce in India can be obtained through mutual consent or contested divorce.",
    grounds: [
      "Adultery",
      "Cruelty (physical or mental)",
      "Desertion for 2+ years",
      "Religious conversion",
      "Mental disorder",
      "Communicable disease",
      "Renunciation of world",
      "Presumption of death"
    ],
    process: {
      mutualConsent: [
        "1. File joint petition in family court",
        "2. First motion hearing",
        "3. 6-month cooling period (can be waived)",
        "4. Second motion hearing",
        "5. Final decree of divorce"
      ],
      contested: [
        "1. File petition by one party",
        "2. Response by other party",
        "3. Evidence and hearings",
        "4. Final arguments",
        "5. Court judgment"
      ]
    },
    requirements: [
      "Marriage certificate",
      "Address proof",
      "Income proof",
      "Photographs",
      "Evidence supporting grounds"
    ]
  },
  property: {
    registration: {
      steps: [
        "1. Title verification",
        "2. Document preparation",
        "3. Token registration",
        "4. Payment of stamp duty",
        "5. Document registration",
        "6. Record updates"
      ],
      documents: [
        "Sale deed",
        "Title documents",
        "Property tax receipts",
        "Encumbrance certificate",
        "ID proof",
        "Address proof"
      ]
    },
    disputes: {
      types: [
        "Boundary disputes",
        "Title disputes",
        "Inheritance issues",
        "Tenant-landlord conflicts",
        "Construction disputes"
      ],
      resolution: [
        "1. Legal notice",
        "2. Mediation",
        "3. Civil suit",
        "4. Alternative dispute resolution"
      ]
    }
  },
  criminal: {
    rights: [
      "Right to remain silent",
      "Right to legal representation",
      "Right to fair trial",
      "Protection against self-incrimination",
      "Right to bail (for bailable offenses)"
    ],
    arrest: {
      procedure: [
        "1. Police must inform grounds of arrest",
        "2. Right to inform family/friends",
        "3. Medical examination if requested",
        "4. Must be presented before magistrate within 24 hours",
        "5. Right to meet lawyer during interrogation"
      ]
    }
  },
  consumer: {
    complaints: {
      process: [
        "1. Written complaint to business",
        "2. File complaint with consumer forum",
        "3. Submit required documents",
        "4. Attend hearings",
        "5. Final order"
      ],
      forums: [
        "District Consumer Forum (up to 20 lakhs)",
        "State Commission (20-1 crore)",
        "National Commission (above 1 crore)"
      ]
    },
    rights: [
      "Right to safety",
      "Right to information",
      "Right to choose",
      "Right to be heard",
      "Right to seek redressal",
      "Right to consumer education"
    ]
  },
  employment: {
    rights: [
      "Minimum wage",
      "Safe working conditions",
      "Equal remuneration",
      "Protection against harassment",
      "Social security benefits"
    ],
    disputes: {
      types: [
        "Wrongful termination",
        "Salary disputes",
        "Discrimination",
        "Workplace harassment",
        "Benefits disputes"
      ],
      resolution: [
        "1. Internal grievance",
        "2. Labor commissioner",
        "3. Industrial tribunal",
        "4. Civil court"
      ]
    }
  },
  familyLaw: {
    adoption: {
      process: [
        "1. Eligibility verification",
        "2. Home study and assessment",
        "3. Child matching",
        "4. Legal petition filing",
        "5. Court hearing",
        "6. Final adoption order"
      ],
      requirements: [
        "Age criteria for adoptive parents",
        "Financial stability proof",
        "Medical fitness certificate",
        "No criminal record"
      ],
      documents: [
        "Identity proof",
        "Income proof",
        "Marriage certificate (if married)",
        "Medical certificates",
        "Address proof"
      ]
    },
    childCustody: {
      types: [
        "Physical custody",
        "Legal custody",
        "Sole custody",
        "Joint custody"
      ],
      factors: [
        "Child's best interest",
        "Child's preference (if mature)",
        "Parents' capability",
        "Home environment",
        "Educational opportunities"
      ]
    }
  },
  corporateLaw: {
    companyFormation: {
      types: [
        "Private Limited Company",
        "Public Limited Company",
        "One Person Company",
        "Limited Liability Partnership"
      ],
      process: [
        "1. Name approval",
        "2. Document preparation",
        "3. Registration with ROC",
        "4. PAN/TAN registration",
        "5. Bank account opening"
      ]
    },
    compliance: {
      annual: [
        "Annual returns filing",
        "Financial statements",
        "Tax returns",
        "Board meetings",
        "Shareholder meetings"
      ]
    }
  }
};

const keywordMap = {
  familyLaw: [
    'adoption', 'child custody', 'guardian', 'foster care',
    'family court', 'custody battle', 'visitation rights'
  ],
  corporateLaw: [
    'company registration', 'business law', 'corporate',
    'startup', 'incorporation', 'shareholders', 'directors'
  ],
  divorce: ['divorce', 'marriage', 'mutual consent', 'alimony', 'separation'],
  property: ['property', 'real estate', 'house', 'land', 'registration', 'tenant'],
  criminal: ['criminal', 'arrest', 'police', 'bail', 'crime', 'rights'],
  consumer: ['consumer', 'complaint', 'product', 'service', 'refund'],
  employment: ['job', 'work', 'salary', 'employee', 'workplace', 'office']
};

export const findRelevantInfo = (query) => {
  const queryLower = query.toLowerCase();
  
  let matchedCategory = null;
  Object.entries(keywordMap).forEach(([category, keywords]) => {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      matchedCategory = category;
    }
  });

  if (matchedCategory) {
    return formatDetailedResponse(matchedCategory, legalKnowledgeBase[matchedCategory], queryLower);
  }

  return generateGeneralResponse(queryLower);
};

const formatDetailedResponse = (category, info, query) => {
  let response = '';
  
  switch (category) {
    case 'familyLaw':
      if (query.includes('adopt')) {
        response = `Adoption Process:\n${info.adoption.process.join('\n')}\n\n`;
        response += `Requirements:\n• ${info.adoption.requirements.join('\n• ')}`;
      } else if (query.includes('custody')) {
        response = `Child Custody Types:\n• ${info.childCustody.types.join('\n• ')}\n\n`;
        response += `Factors Considered:\n• ${info.childCustody.factors.join('\n• ')}`;
      }
      break;

    case 'corporateLaw':
      if (query.includes('company') || query.includes('registration')) {
        response = `Company Types:\n• ${info.companyFormation.types.join('\n• ')}\n\n`;
        response += `Registration Process:\n${info.companyFormation.process.join('\n')}`;
      } else if (query.includes('compliance')) {
        response = `Annual Compliance Requirements:\n• ${info.compliance.annual.join('\n• ')}`;
      }
      break;
    
    case 'divorce':
      if (query.includes('ground')) {
        response = `Grounds for divorce in India include:\n• ${info.grounds.join('\n• ')}`;
      }
      if (query.includes('process') || query.includes('procedure') || query.includes('how')) {
        response = `Divorce process through mutual consent:\n${info.process.mutualConsent.join('\n')}

For contested divorce:\n${info.process.contested.join('\n')}`;
      }
      if (query.includes('document') || query.includes('require')) {
        response = `Required documents for divorce:\n• ${info.requirements.join('\n• ')}`;
      }
      response = `Overview of Divorce in India:\n${info.overview}\n\nYou can ask about:\n• Grounds for divorce\n• Divorce process\n• Required documents`;
      break;

    case 'property':
      if (query.includes('register') || query.includes('how')) {
        response = `Property registration steps:\n${info.registration.steps.join('\n')}`;
      }
      if (query.includes('dispute') || query.includes('conflict')) {
        response = `Common property disputes:\n• ${info.disputes.types.join('\n• ')}\n\nDispute Resolution Process:\n${info.disputes.resolution.join('\n')}`;
      }
      if (query.includes('document')) {
        response = `Property registration documents required:\n• ${info.registration.documents.join('\n• ')}`;
      }
      response = `Property Related Information:\n• Registration Process\n• Required Documents\n• Dispute Resolution\n\nWhat specific information would you like to know?`;
      break;

    case 'criminal':
      if (query.includes('right')) {
        response = `Your fundamental rights in criminal cases:\n• ${info.rights.join('\n• ')}`;
      }
      if (query.includes('arrest')) {
        response = `Arrest procedure and rights:\n${info.arrest.procedure.join('\n')}`;
      }
      response = `Criminal Law Information:\n• Basic Rights\n• Arrest Procedure\n\nWhat specific information would you like to know?`;
      break;

    case 'consumer':
      if (query.includes('complaint') || query.includes('file')) {
        response = `Consumer complaint process:\n${info.complaints.process.join('\n')}\n\nComplaint Forums:\n• ${info.complaints.forums.join('\n• ')}`;
      }
      if (query.includes('right')) {
        response = `Consumer Rights:\n• ${info.rights.join('\n• ')}`;
      }
      response = `Consumer Protection Information:\n• Filing Complaints\n• Consumer Rights\n• Available Forums\n\nWhat specific information would you like to know?`;
      break;

    case 'employment':
      if (query.includes('right')) {
        response = `Employee Rights:\n• ${info.rights.join('\n• ')}`;
      }
      if (query.includes('dispute') || query.includes('problem')) {
        response = `Common employment disputes:\n• ${info.disputes.types.join('\n• ')}\n\nDispute Resolution Process:\n${info.disputes.resolution.join('\n')}`;
      }
      response = `Employment Law Information:\n• Employee Rights\n• Dispute Types\n• Resolution Process\n\nWhat specific information would you like to know?`;
      break;

    default:
      response = generateGeneralResponse(query);
  }

  return response || `Information about ${category}:\n${JSON.stringify(info, null, 2)}`;
};

const generateGeneralResponse = (query) => {
  const generalResponses = {
    help: "I can help you with information about:\n• Divorce and Family Law\n• Property Matters\n• Criminal Law\n• Consumer Rights\n• Employment Law\n\nWhat would you like to know about?",
    greeting: "Hello! I'm your legal assistant. I can provide information about divorce, property, criminal law, consumer rights, and employment matters. How can I help you today?",
    thanks: "You're welcome! Is there anything else you'd like to know about?",
    bye: "Goodbye! Feel free to return if you have more legal questions."
  };

  if (query.includes('help') || query.includes('what can you')) {
    return generalResponses.help;
  }
  if (query.includes('hello') || query.includes('hi ')) {
    return generalResponses.greeting;
  }
  if (query.includes('thank')) {
    return generalResponses.thanks;
  }
  if (query.includes('bye') || query.includes('goodbye')) {
    return generalResponses.bye;
  }

  return "I can provide information about divorce, property, criminal law, consumer rights, and employment matters. Could you please specify which area you're interested in?";
};

export const generateFollowUpSuggestions = (query) => {
  const queryLower = query.toLowerCase();
  
  const suggestions = {
    divorce: [
      "What are the grounds for divorce?",
      "What is the divorce process?",
      "What documents are required for divorce?"
    ],
    property: [
      "How to register property?",
      "What documents are needed for property registration?",
      "How to resolve property disputes?"
    ],
    criminal: [
      "What are my rights if arrested?",
      "What is the arrest procedure?",
      "What are my basic legal rights?"
    ],
    consumer: [
      "How to file a consumer complaint?",
      "What are my consumer rights?",
      "Which forum should I approach?"
    ],
    employment: [
      "What are my employee rights?",
      "How to resolve workplace disputes?",
      "What is the complaint process?"
    ]
  };

  for (const [category, keywords] of Object.entries({
    divorce: ['divorce', 'marriage'],
    property: ['property', 'house', 'land'],
    criminal: ['criminal', 'arrest', 'police'],
    consumer: ['consumer', 'complaint', 'product'],
    employment: ['job', 'work', 'employee']
  })) {
    if (keywords.some(word => queryLower.includes(word))) {
      return suggestions[category];
    }
  }

  return [
    "Could you tell me more about your legal concern?",
    "Which area of law are you interested in?",
    "Would you like to know about specific legal procedures?"
  ];
};

const generateAIResponse = async (userQuery) => {
  setIsTyping(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = findRelevantInfo(userQuery);
    return response;
  } catch (error) {
    console.error('Response Error:', error);
    return "I apologize, but I'm having trouble processing your request.";
  } finally {
    setIsTyping(false);
  }
}; 