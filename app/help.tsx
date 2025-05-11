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
          Go to the "Add New Alert" screen. Enter a city, state, or GPS coordinates. Use the sliders
          to set wind, wave, and tide limits. Any slider left unmoved is treated as N/A. Tap Save to
          activate your alert.
        </Text>
      ),
    },
    {
      title: '🧭 Navigating Alerts',
      image: require('~/assets/edit.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          Use arrow buttons at the top to navigate screens. Tap the logo to return to Home. In
          View/Edit Alerts, you can adjust wind, wave, and tide conditions, but not location.
        </Text>
      ),
    },
    {
      title: '🔔 Alert Pop-Up',
      image: require('~/assets/alert.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          When conditions match, the TTG alert pop-up appears with your location, condition summary,
          and forecast. Tap the forecast icon for more detail. Use CLOSE ALERT to stop the sound and
          exit the screen.
        </Text>
      ),
    },
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
