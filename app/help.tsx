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

const QA: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <View className="mb-4">
    <Text className="mb-1 text-base font-semibold ">{q}</Text>
    <Text className="text-base ">{a}</Text>
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
          Time To Go (TTG) is an alert app designed for outdoor and water enthusiasts—like kayakers,
          paddleboarders, fishermen, and small boat users. TTG monitors wind, wave, and tide
          conditions at user-selected locations and sends a push notification when your saved
          conditions match. Tapping the notification opens a full-screen alert pop-up. A sonar-style
          PING sound plays every 5 seconds until you close the pop-up or hit the "Silence Alert"
          button. No checking. No stress. Just know—it's Time To Go.
        </Text>
      ),
    },
    {
      title: '🧪 DEMO MODE (Free Version)',
      image: require('~/assets/demo.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          When you first install Time To Go, the app launches in Demo Mode so you can try it out
          risk-free.
          {'\n'}- Add an alert location just like the real version
          {'\n'}- A sample alert will appear ~5 minutes later
          {'\n'}- This alert shows fake (demo) conditions, not real-time weather
          {'\n'}- You'll see the full pop-up alert screen, sound (PING), and forecast layout
          {'\n'}- This is to demonstrate how alerts function—not actual conditions
          {'\n\n'}App Store Reviewers Note: This is a fully functional demo of the alert system. No
          real weather data is shown until the user upgrades.
          {'\n\n'}To activate live alerts based on real wind, wave, and tide forecasts, upgrade to
          the full version for $7.99/year.
        </Text>
      ),
    },
    {
      title: '📍 How to Set an Alert',
      image: require('~/assets/add.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          1. Go to the “Add New Alert” screen.{'\n'}
          2. Enter a location using city, state, address, or GPS coordinates (e.g., 26.743,
          -82.263).{'\n'}
          3. (Optional) Enter your activity (e.g., paddling, fishing).{'\n'}
          4. Set your preferred conditions using the sliders:{'\n'}- Wind – up to 20 mph max{'\n'}-
          Wave – up to 10 feet max{'\n'}- Tide – choose Low, Medium, or High and a 3-hour time block
          (e.g., 6–9 AM){'\n'}
          5. Leave any setting at N/A if you have no preference.{'\n'}
          6. Tap SAVE. A confirmation sound will play.
        </Text>
      ),
    },
    {
      title: '🧭 Navigating the App',
      image: require('~/assets/edit.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          Time To Go has three main navigable screens, accessed using the arrow icons at the top:
          {'\n\n'}- Home Screen: Includes five buttons — Add Alerts, View/Edit Alerts, Settings,
          Help, and Quit App.
          {'\n'}- Add New Alert: Create a new alert with your chosen wind, wave, and tide settings.
          {'\n'}- Alerts – Edit / Read: Review and adjust existing alerts. Conditions can be
          changed, but not the location.
          {'\n\n'}Tap the TTG logo to return to Home (except during a pop-up alert).
        </Text>
      ),
    },
    {
      title: '🔔 Alert Pop-Up',
      image: require('~/assets/alert.jpg'),
      content: (
        <Text className="text-base leading-relaxed">
          TTG triggers a push notification when your saved conditions match.{'\n'}
          Tapping the notification opens a full-screen alert pop-up.{'\n'}A sonar-style PING sound
          plays every 5 seconds until you close the pop-up or hit the "Silence Alert" button.{'\n'}
          The pop-up displays the location, time block, and matching forecasted conditions including
          wind, wave, and tide.{'\n'}
          The forecast summary box can be tapped to view more detailed weather information.{'\n'}
          Each alert includes a 1–3 star confidence rating based on how well forecast sources agree.
          {'\n\n'}
          Tap "Close Alert" to dismiss the alert and stop the sound.{'\n'}
          Tap "Silence Alert" to stop the sound but leave the pop-up on screen.
        </Text>
      ),
    },
    {
      title: '🌍 How to Paste GPS Coordinates',
      content: (
        <Text className="text-base leading-relaxed">
          You can enter exact coordinates instead of a city or address. Here's how to copy them from
          common map apps:{'\n\n'}
          From Google Maps:{'\n'}- Tap and hold anywhere on the map to drop a red pin.{'\n'}- The
          coordinates appear at the bottom.{'\n'}- Tap to copy them.{'\n'}- Paste into TTG's
          location field.{'\n\n'}
          From Apple Maps:{'\n'}- Tap and hold on the map to drop a pin.{'\n'}- Swipe up on the info
          card.{'\n'}- Coordinates will be listed.{'\n'}- Tap and hold to copy them.{'\n'}- Paste
          into TTG's location field.{'\n\n'}
          Format example: 26.743, -82.263
        </Text>
      ),
    },
    {
      title: '🛠 TTG Settings',
      content: (
        <Text className="text-base leading-relaxed">
          The Settings screen lets you customize how TTG alerts behave.{'\n\n'}- Premium Signup:
          Upgrade to unlock real alerts. Demo mode only shows test alerts.{'\n'}- Alert Duration:
          Choose how far in advance you want to be alerted (5, 3, 2, 1 days or same-day).{'\n'}-
          Alert Frequency: Set how many alerts TTG can send per day.{'\n'}- Sound Setting: Toggle
          the alert sound on or off. When enabled, a sonar-style ping plays every 5 seconds during
          alerts. The sound cannot be customized.
        </Text>
      ),
    },
    {
      title: '❓ Frequently Asked Questions',
      content: (
        <View>
          <QA
            q="Q: What if my location isn't listed?"
            a="A: We've included thousands of real coastal spots, but if you don't see yours, just copy/paste GPS coordinates from Google or Apple Maps."
          />
          <QA
            q="Q: How long do alerts last?"
            a="A: Alerts automatically expire after your selected time window passes. You can edit or remove them at any time from the Alerts screen."
          />
          <QA
            q="Q: Does this app track me?"
            a="A: Never. There's no GPS, no location tracking, and no background data collection. It only checks the forecast for the location you choose."
          />
          <QA
            q="Q: Any tips for setting alerts?"
            a="A: Set alerts for ramps or beaches closest to your favorite spots. Wind direction matters too—offshore wind often means calm water."
          />
          <QA
            q="Q: Why didn't I get an alert today?"
            a="A: Your alert only fires when all your conditions match during your chosen time window. No match = no alert. That's the whole point — we don't bug you unless it's good."
          />
          <QA
            q="Q: What do the confidence stars mean?"
            a="A: More stars = higher confidence. They show how well different weather models agree. It's a quick way to judge forecast reliability."
          />
          <QA
            q="Q: Can I get alerts for more than one place?"
            a="A: Yes — you can set up to 4 locations. Just tap “Add Alert” on the Home Screen to create another one."
          />
          <QA
            q="Q: What happens if I ignore an alert?"
            a="A: If you don't open it, the app sends a quiet backup reminder once. After that, it expires. No nagging."
          />
          <QA
            q="Q: How much battery or data does this app use?"
            a="A: Almost none. It runs light in the background and only checks your alerts. No GPS, no constant data pull — it's built lean on purpose."
          />
        </View>
      ),
    },
    {
      title: '📩 Feedback',
      content: (
        <Text className="text-base leading-relaxed">
          Got ideas to make Time To Go better? Found a bug? We'd love to hear from you.{'\n\n'}
          Please email us at:{'\n'}
          <Text className="font-semibold">support@timetoogo.com</Text>
          {'\n\n'}
          Your feedback helps us improve the app for everyone.{'\n'}
          We read every message — thank you!
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
