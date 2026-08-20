import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { subject: 'Serving', A: 85, fullMark: 100 },
  { subject: 'Setting', A: 98, fullMark: 100 },
  { subject: 'Hitting', A: 86, fullMark: 100 },
  { subject: 'Blocking', A: 70, fullMark: 100 },
  { subject: 'Defense', A: 90, fullMark: 100 },
  { subject: 'Stamina', A: 80, fullMark: 100 },
];

export default function SkillRadarChart() {
  return (
    <div className="w-full h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 8, fontWeight: 900 }}
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#fff"
            fill="#fff"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
