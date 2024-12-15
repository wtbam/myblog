

<template>
    <div class="contcatup">给我留言</div>
    <div class="contcat">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label=" 你的名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity time">
                <el-col :span="11">
                    <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox value="Online activities" name="type">
                        Online activities
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                        Promotion activities
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                        Offline activities
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                        Simple brand exposure
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
                <el-radio-group v-model="form.resource">
                    <el-radio value="Sponsor">Sponsor</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="你的留言">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import axios from 'axios';

    // do not use same name with ref
    const form = reactive({
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    })
    
    const onSubmit = () => {
        console.log('submit!')
        ElMessage({
            message: 'Congrats, this is a success message.',
            type: 'success',
    })
    }
    //发送，以后连接后端之后调用此方法
    const fetchData = async () => {
        try {
        const response = await axios.post(`https://api.example.com/data/feedback`, form);
        
        } catch (err) {
        // console.log(err);
        
        }
        
    };
</script>

<style scoped>
.contcat{
    display: flex;
    justify-content: center; /* Centers items horizontally */
    /* align-items: center; */
    margin-top: 50px;
}
.contcatup{
    color: rgb(77, 77, 77);
    margin: 50px 0px;
}

</style>