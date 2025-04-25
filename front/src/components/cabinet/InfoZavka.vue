<template>
  <div v-if="isIndividual" class="application-card">
    <div class="card-header">
      <h3 class="card-title">{{ name }}</h3>
      <span class="card-status" :class="statusClass">{{
        competition_type_display
      }}</span>
    </div>

    <div class="card-content">
      <div class="info-row">
        <span class="info-label"> Название соревнования:</span>
        <span class="info-value">{{ competition_type_display }}</span>
        <span class="info-value">{{ teamName }} </span>
      </div>
      <div class="info-row">
        <span class="info-label">Состав команды: </span>
        <div v-for="us in team_members" class="com">
          <span class="info-value"
            >{{ us.name }} {{ us.patronymic }} {{ us.surname }} - '{{
              us.nickName
            }}'
          </span>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button class="action-btn reject-btn" @click="closeTeam">
        Отклонить
      </button>
      <button class="action-btn approve-btn" @click="openTeam">
        Подтвердить
      </button>
    </div>
  </div>
  <div v-else class="application-card">
    <div class="card-header">
      <h3 class="card-title">{{ name }}</h3>
      <span class="card-status" :class="statusClass">{{
        competition_type_display
      }}</span>
    </div>

    <div class="card-content">
      <div class="info-row">
        <span class="info-label"> Название соревнований:</span>
        <span class="info-value">{{ competition_type_display }}</span>
        <span class="info-value">{{ teamName }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">ФИО:</span>
        <span class="info-value"
          >{{ user.name }} {{ user.patronymic }} {{ user.surname }}</span
        >
      </div>
    </div>

    <div class="card-actions">
      <button class="action-btn reject-btn" @click="closeUser">
        Отклонить
      </button>
      <button class="action-btn approve-btn" @click="openUser">
        Подтвердить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import formatDateRange from "@/use/useFilterData";
import axios from "axios";
const emit = defineEmits([
  "approveApplication",
  "rejectApplication",
  "close",
  "open",
]);
const props = defineProps({
  name: String,
  competition_type_display: String,
  type_display: String,
  discipline_name: String,
  startDate: String,
  endDate: String,
  description: String,
  id: Number,
  isIndividual: Boolean,
  teamName: String,
  team_members: Array,
  user: Object,
  teamId: Number,
  userId: Number,
});
const token = ref();
const action = ref({
  accept: "accept",
  reject: "reject",
});
const closeTeam = () => {
  emit("rejectApplication", props.id);
  emit("open", {
    action: action.value.reject,
    id: props.teamId,
    reason: "Отказано в доступе",
  });
};
const openTeam = () => {
  emit("approveApplication", props.id);
  emit("open", { action: action.value.accept, id: props.teamId });
};
const closeUser = () => {
  emit("close", {
    action: action.value.reject,
    id: props.userId,
    reason: "Отказано в доступе",
  });
};
const openUser = () => {
  emit("close", { action: action.value.accept, id: props.userId });
};
onMounted(() => {
  token.value = localStorage.getItem("jwtToken");
});
</script>

<style scoped>
.com {
  display: flex;
  flex-direction: column;
}
.application-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 10px;
  margin-bottom: 16px;
  border-left: 4px solid var(--sin);
  transition: all 0.3s ease;
}

.application-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eaeaea;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
}

.card-status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pending {
  background-color: #fef9c3;
  color: #854d0e;
}

.status-approved {
  background-color: #dcfce7;
  color: #166534;
}

.status-rejected {
  background-color: #fee2e2;
  color: #991b1b;
}

.card-content {
  margin-bottom: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-bottom: 8px;
}
.info-row.descr {
  max-width: 700px;
}
.info-label {
  font-weight: 500;
  color: #7f8c8d;
  min-width: 120px;
}

.info-value {
  color: #2c3e50;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #eaeaea;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.approve-btn {
  background-color: #3b82f6;
  color: white;
}

.approve-btn:hover {
  background-color: #2563eb;
}

.reject-btn {
  background-color: #f8f9fa;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.reject-btn:hover {
  background-color: #fee2e2;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .card-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
