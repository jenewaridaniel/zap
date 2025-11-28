import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: Platform.OS === "ios" ? 85 : 70,
          paddingBottom: Platform.OS === "ios" ? 20 : 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="offer"
        options={{
          title: "Offers",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
