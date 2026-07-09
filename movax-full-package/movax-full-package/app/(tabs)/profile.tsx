import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../../components/LogoutButton';

const MENU_ITEMS = [
  { label: 'Personal Information', icon: 'person.fill' as const },
  { label: 'Shipment History', icon: 'shippingbox.fill' as const },
  { label: 'Notifications', icon: 'clock.fill' as const },
];

export default function ProfileScreen() {
  const { user } = useAuth();

  const displayName = user?.displayName || 'Movax User';
  const email = user?.email || '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <View style={styles.menuIconWrap}>
              <IconSymbol name={item.icon} size={18} color="#1a73e8" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <IconSymbol name="chevron.right" size={18} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutWrap}>
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    backgroundColor: '#0f172a',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1a73e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '700' },
  name: { color: '#fff', fontSize: 19, fontWeight: '700' },
  email: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  menu: { paddingHorizontal: 24, paddingTop: 24 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 12,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#222' },
  logoutWrap: { paddingHorizontal: 24, marginTop: 12 },
});
