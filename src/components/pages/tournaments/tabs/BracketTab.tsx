'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';
import { cn } from '@/lib/utils';

interface BracketTabProps {
  tournament: Tournament;
}

interface Team {
  name: string;
  score?: number | string;
  isWinner?: boolean;
}

type MatchNodeData = {
  team1: Team;
  team2: Team;
  round: string;
  isFinal?: boolean;
  [key: string]: unknown;
};

type LabelNodeData = {
  label: string;
  [key: string]: unknown;
};

// Custom Match Node Component
const MatchNode = ({ data }: { data: MatchNodeData }) => {
  const { team1, team2, isFinal } = data;

  return (
    <div
      className={cn(
        'overflow-hidden rounded border bg-[#0b0e12] shadow-md',
        isFinal ? 'border-primary/50 w-44' : 'border-border w-40'
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="bg-border! h-2! w-2!"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-border! h-2! w-2!"
      />

      {/* Team 1 */}
      <div
        className={cn(
          'border-border/50 flex items-center justify-between border-b px-3 py-2',
          team1.isWinner && 'bg-primary/10'
        )}
      >
        <span
          className={cn(
            'truncate text-xs font-bold',
            team1.isWinner ? 'text-white' : 'text-muted-foreground'
          )}
        >
          {team1.name}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          {team1.score ?? '-'}
        </span>
      </div>

      {/* Team 2 */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2',
          team2.isWinner && 'bg-primary/10'
        )}
      >
        <span
          className={cn(
            'truncate text-xs font-bold',
            team2.isWinner ? 'text-white' : 'text-muted-foreground'
          )}
        >
          {team2.name}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          {team2.score ?? '-'}
        </span>
      </div>
    </div>
  );
};

// Label Node Component
const LabelNode = ({ data }: { data: LabelNodeData }) => (
  <div className="text-muted-foreground text-[10px] font-bold tracking-widest whitespace-nowrap uppercase">
    {data.label}
  </div>
);

const nodeTypes = { match: MatchNode, label: LabelNode };

export const BracketTab = ({ tournament }: BracketTabProps) => {
  const initialNodes = useMemo(
    () => [
      // Round Labels
      {
        id: 'label-lq',
        type: 'label',
        position: { x: 20, y: -40 },
        data: { label: 'Quarter Finals' },
        draggable: false,
      },
      {
        id: 'label-ls',
        type: 'label',
        position: { x: 240, y: -40 },
        data: { label: 'Semi Finals' },
        draggable: false,
      },
      {
        id: 'label-final',
        type: 'label',
        position: { x: 460, y: -40 },
        data: { label: 'Grand Final' },
        draggable: false,
      },
      {
        id: 'label-rs',
        type: 'label',
        position: { x: 680, y: -40 },
        data: { label: 'Semi Finals' },
        draggable: false,
      },
      {
        id: 'label-rq',
        type: 'label',
        position: { x: 900, y: -40 },
        data: { label: 'Quarter Finals' },
        draggable: false,
      },

      // Left Quarters
      {
        id: 'lq1',
        type: 'match',
        position: { x: 0, y: 0 },
        data: {
          team1: { name: 'Team A', score: 2, isWinner: true },
          team2: { name: 'Team B', score: 0 },
          round: 'Quarter Finals',
        },
      },
      {
        id: 'lq2',
        type: 'match',
        position: { x: 0, y: 120 },
        data: {
          team1: { name: 'Team C', score: 1 },
          team2: { name: 'Team D', score: 2, isWinner: true },
          round: 'Quarter Finals',
        },
      },

      // Left Semi
      {
        id: 'ls1',
        type: 'match',
        position: { x: 220, y: 60 },
        data: {
          team1: { name: 'Team A', score: 1 },
          team2: { name: 'Team D', score: 2, isWinner: true },
          round: 'Semi Finals',
        },
      },

      // Grand Final
      {
        id: 'final',
        type: 'match',
        position: { x: 440, y: 60 },
        data: {
          team1: { name: 'Team D' },
          team2: { name: 'Team G' },
          round: 'Grand Final',
          isFinal: true,
        },
      },

      // Right Semi
      {
        id: 'rs1',
        type: 'match',
        position: { x: 660, y: 60 },
        data: {
          team1: { name: 'Team F', score: 0 },
          team2: { name: 'Team G', score: 2, isWinner: true },
          round: 'Semi Finals',
        },
      },

      // Right Quarters
      {
        id: 'rq1',
        type: 'match',
        position: { x: 880, y: 0 },
        data: {
          team1: { name: 'Team E', score: 0 },
          team2: { name: 'Team F', score: 2, isWinner: true },
          round: 'Quarter Finals',
        },
      },
      {
        id: 'rq2',
        type: 'match',
        position: { x: 880, y: 120 },
        data: {
          team1: { name: 'Team G', score: 2, isWinner: true },
          team2: { name: 'Team H', score: 1 },
          round: 'Quarter Finals',
        },
      },
    ],
    []
  );

  const initialEdges = useMemo(
    () => [
      // Left side
      {
        id: 'e-lq1-ls1',
        source: 'lq1',
        target: 'ls1',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },
      {
        id: 'e-lq2-ls1',
        source: 'lq2',
        target: 'ls1',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },
      {
        id: 'e-ls1-final',
        source: 'ls1',
        target: 'final',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },

      // Right side
      {
        id: 'e-final-rs1',
        source: 'final',
        target: 'rs1',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },
      {
        id: 'e-rs1-rq1',
        source: 'rs1',
        target: 'rq1',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },
      {
        id: 'e-rs1-rq2',
        source: 'rs1',
        target: 'rq2',
        type: 'smoothstep',
        style: { stroke: '#273440' },
      },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[280px] w-full overflow-hidden rounded-lg md:h-[350px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1, minZoom: 0.2, maxZoom: 1 }}
        minZoom={0.1}
        maxZoom={1.5}
        panOnDrag={true}
        zoomOnScroll={true}
        preventScrolling={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Controls
          showZoom={true}
          showFitView={true}
          showInteractive={false}
          position="bottom-right"
          className="bg-card! border-border! [&>button]:bg-card! [&>button]:border-border! [&>button]:fill-muted-foreground! [&>button:hover]:bg-primary/20! shadow-lg! [&>button:hover]:fill-white!"
        />
      </ReactFlow>
    </div>
  );
};
