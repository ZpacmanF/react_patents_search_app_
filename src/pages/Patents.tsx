import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, FileText } from "lucide-react";
import { patents } from "../api";
import toast from "react-hot-toast";
import { Patent } from "../types";
import { debounce } from "lodash";

export default function Patents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patentList, setPatentList] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPatents = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Iniciando busca com query:", query);
      const response = await patents.search(query);

      if (Array.isArray(response)) {
        setPatentList(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setPatentList(response.data);
      } else {
        throw new Error("Formato de resposta inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar patentes:", error);
      setError("Falha ao carregar as patentes. Por favor, tente novamente.");
      toast.error("Erro ao buscar patentes");
      setPatentList([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      searchPatents(query);
    }, 300),
    []
  );

  useEffect(() => {
    searchPatents("");
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch (error) {
      console.error("Erro ao formatar data:", dateString, error);
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Buscar patentes
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar patentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : patentList.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhuma patente encontrada
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {patentList.map((patent) => (
              <li key={patent._id}>
                <Link
                  to={`/patents/${patent._id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {patent.name}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {patent.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {patent.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Registrada em {formatDate(patent.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
