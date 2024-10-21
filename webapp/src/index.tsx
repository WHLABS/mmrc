import {Store, Action} from 'redux';
import React from 'react';
import {GlobalState} from '@mattermost/types/lib/store';
import manifest from '@/manifest';
import {PluginRegistry} from '@/types/mattermost-webapp';

// FullCalendar 관련 추가
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// 기존 플러그인 클래스 유지
export default class Plugin {
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // FullCalendar를 플러그인에 통합
        registry.registerAppComponent(() => (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Project Deadline', date: '2024-10-20' },
                    { title: 'Team Meeting', date: '2024-10-25' }
                ]}
            />
        ));
    }
}

// 기존의 글로벌 선언 유지
declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void;
    }
}

// 플러그인 등록 유지
window.registerPlugin(manifest.id, new Plugin());
