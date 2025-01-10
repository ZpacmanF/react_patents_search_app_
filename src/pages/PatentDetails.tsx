import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Calendar, Users, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { patents } from '../api';
import type { Patent } from '../types';

export default function PatentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patent, setPatent] = useState<Patent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatent = async () => {
      try {
        const data = await patents.getById(id!);
        setPatent(data);
      } catch (error) {
        toast.error('Erro ao carregar patente');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPatent();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta patente?')) {
      return;
    }

    try {
      await patents.delete(id!);
      toast.success('Patente excluída com sucesso');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao excluir patente');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (!patent) {
    return <div className="text-center py-12">Patente não encontrada</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 text-indigo-500 mr-2" />
            {patent.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detalhes da patente
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/patents/${id}/edit`)}
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
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Inventores
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patent.inventors.join(', ')}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Data de Registro
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(patent.filingDate).toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {patent.status}
              </span>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Descrição</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patent.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}