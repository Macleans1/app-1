import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '../../contexts/AuthContext';

type ShipmentStatus = 'In Transit' | 'Delivered' | 'Pending';

interface Shipment {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  eta: string;
}

const SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingId: 'MVX-28471',
    origin: 'Tema Port',
    destination: 'Kumasi Hub',
    status: 'In Transit',
    eta: 'Arriving Jul 10',
  },
  {
    id: '2',
    trackingId: 'MVX-28402',
    origin: 'Accra Warehouse',
    destination: 'Takoradi',
    status: 'Delivered',
    eta: 'Delivered Jul 6',
  },
  {
    id: '3',
    trackingId: 'MVX-28390',
    origin: 'Lagos Hub',
    destination: 'Accra Warehouse',
    status: 'Pending',
    eta: 'Pickup Jul 12',
  },
];

const STATUS_STYLES: Record<ShipmentStatus, { bg: string; text: string; icon: 'shippingbox.fill' | 'checkmark.circle.fill' | 'clock.fill' }> = {
  'In Transit': { bg: '#e8f0fe', text: '#1a73e8', icon: 'shippingbox.fill' },
  Delivered: { bg: '#e6f4ea', text: '#1a7e3e', icon: 'checkmark.circle.fill' },
  Pending: { bg: '#f1f3f4', text: '#5f6368', icon: 'clock.fill' },
};

function ShipmentCard({ shipment }: { shipment: Shipment }) {
  const statusStyle = STATUS_STYLES[shipment.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.trackingId}>{shipment.trackingId}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <IconSymbol name={statusStyle.icon} size={13} color={statusStyle.text} />
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{shipment.status}</Text>
        </View>
      </View>

      <View style={styles.routeRow}>
        <Text style={styles.routeText}>{shipment.origin}</Text>
        <View style={styles.routeLine}>
          <View style={styles.routeDot} />
          <View style={styles.routeDash} />
          <IconSymbol name="chevron.right" size={14} color="#bbb" />
        </View>
        <Text style={styles.routeText}>{shipment.destination}</Text>
      </View>

      <Text style={styles.etaText}>{shipment.eta}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const [trackingInput, setTrackingInput] = useState('');

  const firstName = user?.displayName?.split(' ')[0] || 'there';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good day, {firstName}</Text>
          <Text style={styles.subGreeting}>Track your shipments with Movax</Text>

          <View style={styles.searchBar}>
            <IconSymbol name="magnifyingglass" size={18} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter tracking number"
              placeholderTextColor="#999"
              value={trackingInput}
              onChangeText={setTrackingInput}
            />
          </View>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Shipment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Active Shipments</Text>
          {SHIPMENTS.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  header: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: { color: '#fff', fontSize: 24, fontWeight: '700' },
  subGreeting: { color: '#94a3b8', fontSize: 14, marginTop: 4, marginBottom: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111' },
  trackButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  trackButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111', marginBottom: 14 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  trackingId: { fontSize: 15, fontWeight: '700', color: '#111', letterSpacing: 0.3 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: { fontSize: 12, fontWeight: '600' },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  routeText: { fontSize: 13, color: '#444', fontWeight: '500', maxWidth: '38%' },
  routeLine: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 4 },
  routeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1a73e8' },
  routeDash: { flex: 1, height: 1, backgroundColor: '#e0e0e0', marginHorizontal: 4 },
  etaText: { fontSize: 12, color: '#888', marginTop: 12 },
});
