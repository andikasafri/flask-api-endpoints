import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Github, Linkedin } from 'lucide-react';

interface Parameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  example?: string;
  schema?: {
    type: string;
  };
}

interface Endpoint {
  method: string;
  path: string;
  summary: string;
  parameters?: Parameter[];
  requestBody?: any;
}

function App() {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const endpoints: Endpoint[] = [
    {
      method: 'POST',
      path: '/api/auth/users',
      summary: 'Create New User',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          example: 'application/json'
        }
      ],
      requestBody: {
        username: 'user1',
        email: 'user1@example.com',
        password: 'SecurePass123!'
      }
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      summary: 'Login User',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          example: 'application/json'
        }
      ],
      requestBody: {
        email: 'user50@example.com',
        password: 'SecurePass123!'
      }
    },
    {
      method: 'GET',
      path: '/api/auth/users/me',
      summary: 'Get Current User Profile',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'PUT',
      path: '/api/auth/users/me',
      summary: 'Update User Email',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ],
      requestBody: {
        email: 'updateduser50@gmail.com'
      }
    },
    {
      method: 'DELETE',
      path: '/api/auth/users/me',
      summary: 'Delete User Account',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'POST',
      path: '/api/accounts',
      summary: 'Create New Account',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        },
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          example: 'application/json'
        }
      ],
      requestBody: {
        account_type: 'savings',
        account_number: 'ACC-5005'
      }
    },
    {
      method: 'GET',
      path: '/api/accounts',
      summary: 'Get All Accounts',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/accounts/1',
      summary: 'Get Account by ID',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'PUT',
      path: '/api/accounts/7',
      summary: 'Update Account Information',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ],
      requestBody: {
        account_number: 'ACC-5065',
        account_type: 'savings'
      }
    },
    {
      method: 'DELETE',
      path: '/api/accounts/1',
      summary: 'Delete Account',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'POST',
      path: '/api/transactions',
      summary: 'Create New Transaction',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        },
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          example: 'application/json'
        }
      ],
      requestBody: {
        type: 'deposit',
        amount: '1000.00',
        to_account_id: '1',
        description: 'Initial deposit'
      }
    },
    {
      method: 'GET',
      path: '/api/transactions',
      summary: 'Get All Transactions',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/transactions/1',
      summary: 'Get Transaction by ID',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    },
    {
      method: 'PUT',
      path: '/api/transactions/1',
      summary: 'Update Transaction',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ],
      requestBody: {
        description: 'Updated transaction description'
      }
    },
    {
      method: 'DELETE',
      path: '/api/transactions/1',
      summary: 'Delete Transaction',
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          required: true,
          description: 'Bearer token'
        }
      ]
    }
  ];

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const toggleEndpoint = (path: string) => {
    setExpandedEndpoint(expandedEndpoint === path ? null : path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">RevoBank API Documentation</h1>
                <p className="text-gray-600 mt-1">Flask REST API by Andika Safri</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/andika-safri/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/andikasafri/revobank-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="border-b border-gray-200 last:border-0">
              <button
                onClick={() => toggleEndpoint(endpoint.path)}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <span className="text-gray-900 font-medium">{endpoint.path}</span>
                  </div>
                  {expandedEndpoint === endpoint.path ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{endpoint.summary}</p>
              </button>

              {expandedEndpoint === endpoint.path && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  {endpoint.parameters && endpoint.parameters.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Parameters</h3>
                      <div className="bg-white rounded-md shadow-sm p-4">
                        {endpoint.parameters.map((param, index) => (
                          <div key={index} className="text-sm mb-2 last:mb-0">
                            <span className="font-medium">{param.name}</span>
                            <span className="text-gray-500"> ({param.in})</span>
                            {param.required && <span className="text-red-500 ml-1">*</span>}
                            {param.description && (
                              <span className="text-gray-500 ml-2">- {param.description}</span>
                            )}
                            {param.example && (
                              <span className="text-gray-500 ml-2">Example: {param.example}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Request Body</h3>
                      <pre className="bg-white rounded-md shadow-sm p-4 overflow-x-auto">
                        <code className="text-sm text-gray-800">
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;