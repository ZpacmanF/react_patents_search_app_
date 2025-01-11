import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Calendar, Trash2, Edit, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { patents } from "../api";
import type { Patent } from "../types";

export default function PatentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patent, setPatent] = useState<Patent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchPatent = async () => {
      try {
        const data = await patents.getById(id!);
        setPatent(data);
        setEditForm({
          name: data.name,
          description: data.description,
          category: data.category,
        });
      } catch (error) {
        toast.error("Erro ao carregar patente");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPatent();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta patente?")) {
      return;
    }

    try {
      await patents.delete(id!);
      toast.success("Patente excluída com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir patente");
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedPatent = await patents.update(id!, editForm);
      setPatent(updatedPatent);
      setIsEditing(false);
      toast.success("Patente atualizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar patente");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (!patent) {
    return <div className="text-center py-12">Patente não encontrada</div>;
  }

  if (isEditing) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Editar Patente
          </h3>
        </div>
        <form onSubmit={handleEdit}>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nome</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="Nome da patente"
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    placeholder="Categoria da patente"
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    placeholder="Descrição detalhada da patente"
                  />
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 text-indigo-500 mr-2" />
            {patent.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes da patente
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Data de Criação
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(patent.createdAt).toLocaleDateString("pt-BR")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Descrição</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patent.description}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Categoria</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patent.category}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
