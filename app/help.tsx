import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/components/Logo';
import Settings from '~/components/icons/Settings';

interface AccordionSectionProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  image?: any;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  image,
}) => (
  <View className="mb-4 overflow-hidden rounded-lg border border-gray-200">
    <TouchableOpacity
      onPress={onToggle}
      className="flex-row items-center justify-between bg-gray-50 p-4">
      <Text className="text-lg font-semibold">{title}</Text>
      <Text className="text-xl">{isOpen ? '−' : '+'}</Text>
    </TouchableOpacity>
    {isOpen && (
      <View className="p-4">
        {image && (
          <Image source={image} className=" mb-4  h-72 w-full rounded-lg" resizeMode="contain" />
        )}
        {content}
      </View>
    )}
  </View>
);

const Help = () => {
  const router = useRouter();
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggleSection = (section: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: '🔍 What Does TTG Do?',
      content: (
        <Text className="text-base leading-relaxed">
  Time to Go (TTG) is an alert app designed for outdoor and water enthusiasts—like kayakers,
  paddleboarders, fishermen, and small boat users. TTG monitors wind, wave, and tide conditions
  at user-selected locations and sends a push notification with a full-screen pop-up alert when
  the conditions match the user’s saved preferences.{"\n\n"}
  No checking. No stress. Just know—it's Time To Go.
</Text>

      ),
    },
    {
      title: '🧪 DEMO MODE (Free Version)',
      image: require('~/assets/demo.jpg'),
      content: (
        <View>
          <Text className="mb-3 text-base leading-relaxed">
            When you first install Time To Go, the app launches in Demo Mode so you can try it out
            risk-free.{'\n'}- Add an alert location just like the real version{'\n'}- A sample alert
            will appear ~5 minutes later{'\n'}- This alert shows fake (demo) conditions, not
            real-time weather{'\n'}- You'll see the full pop-up alert screen, sound (PING), and
            forecast layout{'\n'}- This is to demonstrate how alerts function—not actual conditions
            {'\n\n'}
            App Store Reviewers Note: This is a fully functional demo of the alert system. No real
            weather data is shown until the user upgrades.
          </Text>
          <Text className="text-base leading-relaxed">
            To activate live alerts based on real wind, wave, and tide forecasts, upgrade to the
            full version for $7.99/year.
          </Text>
        </View>
      ),
    },

    {
      title: '📍 How to Set an Alert',
      image: require('~/assets/add.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
  1. Go to the “Add New Alert” screen.{"\n"}
  2. Enter a location using any of the following: city, state, address, or paste GPS coordinates (e.g., 26.743, -82.263).{"\n"}
  3. (Optional) Enter your activity (e.g., paddling, fishing).{"\n"}
  4. Set your preferred conditions using the sliders:{"\n"}
     - Wind – set your max wind speed (e.g., under 10 mph){"\n"}
     - Wave – set your max wave height (e.g., under 2 ft){"\n"}
     - Tide – choose High, Medium, or Low, and optionally select a time range (e.g., 8–10 AM){"\n"}
  5. Any setting left at N/A is ignored and treated as no preference.{"\n"}
  6. Tap SAVE. You’ll return to the home screen and hear a sound confirming your alert was set.
</Text>

      ),
    },
    {
      title: '🧭 Navigating Alerts',
      image: require('~/assets/edit.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
  Time to Go has a simple screen layout with four main screens:{"\n\n"}
  - Home: Shows alert summaries and access to features.{"\n"}
  - Add Alert: Lets you create a new alert with your preferred wind, wave, and tide settings.{"\n"}
  - Edit/View Alerts: Lets you review and adjust saved alerts. You can edit conditions, not location.{"\n"}
  - Pop-Up Alert: This only appears when conditions match. Shows sonar-style alert and weather info.{"\n\n"}
  Use the arrows at the top of the screen to move between Home, Add Alert, and Edit/View Alerts.{"\n"}
  Tap the TTG logo to return to Home—except on the pop-up screen, where the logo is hidden.
</Text>

      ),
    },
    {
      title: '🔔 Alert Pop-Up',
      image: require('~/assets/alert.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
  When your saved conditions match at one of your alert locations, TTG triggers an alert pop-up.{"\n\n"}
  - A full-screen screen appears with a sonar-style ping sound.{"\n"}
  - It shows the location, timing, and all forecasted conditions (wind, wave, tide).{"\n"}
  - The forecast box shows a quick summary and can be tapped for detailed info.{"\n"}
  - Each alert includes a 1–3 star confidence rating based on forecast reliability.{"\n\n"}
  At the bottom of the screen:{"\n"}
  - Tap “Close Alert” to dismiss the alert.{"\n"}
  - Tap “Silence Alarm” to stop the sound but leave the screen open.{"\n\n"}
  Alerts only trigger when all your selected conditions match.
</Text>


      ),
    },
{
  title: '🌍 How to Paste GPS Coordinates',
  content: (
    <Text className="text-base leading-relaxed">
      You can enter exact coordinates into TTG instead of a city or address. Here's how to copy them from common map apps:{"\n\n"}
      From Google Maps:{"\n"}
      - Tap and hold anywhere on the map to drop a red pin.{"\n"}
      - The coordinates appear at the bottom.{"\n"}
      - Tap to copy them.{"\n"}
      - Paste into TTG’s location field.{"\n\n"}
      From Apple Maps:{"\n"}
      - Tap and hold on the map to drop a pin.{"\n"}
      - Swipe up on the info card.{"\n"}
      - Coordinates will be listed.{"\n"}
      - Tap and hold to copy them.{"\n"}
      - Paste into TTG’s location field.{"\n\n"}
      Format example: 26.743, -82.263
    </Text>
  ),
},
    },
    {
      title: '🌍 How to Paste GPS Coordinates',
      content: (
        <Text className="text-base leading-relaxed">
          ...content...
        </Text>
      ),
    }
  ];

  ];

  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="w-1/3 text-3xl font-bold uppercase">How to use</Text>
        <Logo />
        <Text className="w-1/3 text-3xl font-bold uppercase">Time to go</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}>
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            title={section.title}
            content={section.content}
            isOpen={openSections[index]}
            onToggle={() => toggleSection(index)}
            image={section.image}
          />
        ))}
      </ScrollView>
      <View className="absolute bottom-10 w-full items-center">
        <TouchableOpacity onPress={() => router.navigate('/settings')}>
          <Settings />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Help;
