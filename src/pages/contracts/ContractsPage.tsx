import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface Contract {
  id: string;
  client_name: string;
  vehicle: string;
  policy_number: string;
  premium_amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
}

const mockContracts: Contract[] = [
  {
    id: '1',
    client_name: 'Jean Kouassi',
    vehicle: 'Toyota Corolla 2020',
    policy_number: 'G3A-123456-7890',
    premium_amount: 150000,
    start_date: '2023-06-01',
    end_date: '2024-05-31',
    status: 'active'
  },
  {
    id: '2',
    client_name: 'Marie Diallo',
    vehicle: 'Honda Civic 2019',
    policy_number: 'G3A-234567-8901',
    premium_amount: 180000,
    start_date: '2023-01-15',
    end_date: '2024-01-14',
    status: 'pending'
  },
  {
    id: '3',
    client_name: 'Koffi Asante',
    vehicle: 'Nissan Sentra 2021',
    policy_number: 'G3A-345678-9012',
    premium_amount: 165000,
    start_date: '2022-11-01',
    end_date: '2023-10-31',
    status: 'expired'
  }
];

export function ContractsPage() {
  const { user } = useAuthStore();
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.policy_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'expired':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contrats d'assurance</h1>
          <p className="text-gray-500">
            Gérez tous vos contrats d'assurance automobile
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contrat
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par client, police ou véhicule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="expired">Expiré</option>
            <option value="cancelled">Annulé</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">{contract.client_name}</CardTitle>
                    <p className="text-sm text-gray-500">{contract.vehicle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(contract.status)}
                  <Badge variant={getStatusBadgeVariant(contract.status)}>
                    {contract.status === 'active' && 'Actif'}
                    {contract.status === 'pending' && 'En attente'}
                    {contract.status === 'expired' && 'Expiré'}
                    {contract.status === 'cancelled' && 'Annulé'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Police N°</p>
                  <p className="text-sm font-medium">{contract.policy_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prime annuelle</p>
                  <p className="text-sm font-medium">{formatCurrency(contract.premium_amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de début</p>
                  <p className="text-sm font-medium">{formatDate(contract.start_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de fin</p>
                  <p className="text-sm font-medium">{formatDate(contract.end_date)}</p>
                  {contract.status === 'active' && (
                    <p className="text-xs text-orange-600">
                      {calculateDaysRemaining(contract.end_date)} jours restants
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Voir
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <FileText className="w-10 h-10 mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Aucun contrat trouvé</p>
            <p className="text-sm text-gray-500 text-center mb-4">
              Aucun contrat ne correspond à vos critères de recherche.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Créer un nouveau contrat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
