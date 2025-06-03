import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  Car,
  CircleDollarSign,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils';

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
  const [contracts] = useState<Contract[]>(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredContracts = contracts.filter(contract =>
    contract.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.policy_number.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(contract =>
    statusFilter === 'all' ? true : contract.status === statusFilter
  );

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

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-full md:w-64">
          <Search className="absolute top-0 left-3 h-full text-gray-400" size={18} />
          <Input
            placeholder="Rechercher un contrat..."
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
        {filteredContracts.length === 0 && (
          <EmptyState message="Aucun contrat trouvé" />
        )}
      </div>
    </div>
  );
}

interface ContractCardProps {
  contract: Contract;
}

function ContractCard({ contract }: ContractCardProps) {
  const daysRemaining = contract.status === 'active' ? calculateDaysRemaining(contract.end_date) : 0;

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return 'bg-teal-100 text-teal-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'pending':
        return 'En attente';
      case 'expired':
        return 'Expiré';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md ${
              contract.status === 'active' ? 'bg-teal-100' : 'bg-gray-100'
            }`}>
              <Car className={`w-5 h-5 ${
                contract.status === 'active' ? 'text-teal-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className="text-base font-medium">{contract.client_name}</h3>
              <p className="text-sm text-gray-500">{contract.vehicle}</p>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(contract.status)}>
            {getStatusText(contract.status)}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Numéro de police</span>
            <span className="text-sm font-medium">{contract.policy_number}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Prime annuelle</span>
            <div className="flex items-center gap-1">
              <CircleDollarSign className="w-3 h-3 text-orange-500" />
              <span className="text-sm font-medium">{formatCurrency(contract.premium_amount)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Période de validité</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange-500" />
              <span className="text-sm font-medium">
                {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
              </span>
            </div>
          </div>
        </div>

        {contract.status === 'active' && (
          <div className="mb-4 p-2 bg-orange-50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-orange-800">
                Expiration dans
              </span>
              <span className="text-xs font-bold text-orange-800">
                {daysRemaining} jours
              </span>
            </div>
            <div className="mt-1 w-full bg-orange-200 rounded-full h-1.5">
              <div
                className="bg-orange-500 h-1.5 rounded-full"
                style={{
                  width: `${Math.min(100, (daysRemaining / 365) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-1">
            <Download className="w-4 h-4" />
            Vignette
          </Button>
          <Button variant={contract.status === 'active' ? 'default' : 'secondary'} className="flex-1">
            {contract.status === 'active' ? 'Détails' : 'Renouveler'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message = "Aucun contrat trouvé" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
      <Car className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{message}</h3>
      <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
        Vous n'avez pas encore de contrat d'assurance ou votre recherche n'a retourné aucun résultat.
      </p>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Ajouter un contrat
      </Button>
    </div>
  );
}
